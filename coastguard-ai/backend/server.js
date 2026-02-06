const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Twilio client
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Helper function to get address from coordinates
async function getAddressFromCoordinates(lat, lng) {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            return null; // Return null if no API key
        }

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
        const response = await axios.get(url);

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            // Get the formatted address
            return response.data.results[0].formatted_address;
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error.message);
        return null;
    }
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'CoastGuard AI Backend is running' });
});

// Send SMS endpoint
app.post('/api/send-sms', async (req, res) => {
    try {
        const { message, location } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Check if Twilio is configured
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            return res.status(500).json({
                error: 'Twilio not configured. Please set up your Twilio credentials in .env file'
            });
        }

        if (!process.env.USER_PHONE_NUMBERS) {
            return res.status(500).json({
                error: 'Emergency contacts not configured. Please set USER_PHONE_NUMBERS in .env file'
            });
        }

        // Simple message without emojis or URLs (to avoid carrier blocking)
        let fullMessage = `${message}`;

        if (location && location.lat && location.lng) {
            // Try to get human-readable address
            const address = await getAddressFromCoordinates(location.lat, location.lng);

            if (address) {
                fullMessage += `\n\nAddress: ${address}`;
            } else {
                // Fallback to coordinates if geocoding fails
                fullMessage += `\n\nLocation: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
            }
        }

        // Parse phone numbers (comma-separated)
        const phoneNumbers = process.env.USER_PHONE_NUMBERS
            .split(',')
            .map(num => num.trim())
            .filter(num => num.length > 0);

        console.log(`📱 Sending SMS to ${phoneNumbers.length} contact(s)...`);

        // Send SMS to all contacts in parallel
        const sendPromises = phoneNumbers.map(async (phoneNumber) => {
            try {
                const twilioMessage = await twilioClient.messages.create({
                    body: fullMessage,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: phoneNumber
                });
                console.log(`✅ SMS sent to ${phoneNumber}: ${twilioMessage.sid}`);
                return { success: true, phoneNumber, sid: twilioMessage.sid };
            } catch (error) {
                console.error(`❌ Failed to send to ${phoneNumber}:`, error.message);
                return { success: false, phoneNumber, error: error.message };
            }
        });

        const results = await Promise.all(sendPromises);

        // Count successes and failures
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);

        console.log(`📊 Results: ${successful.length} sent, ${failed.length} failed`);

        res.json({
            success: successful.length > 0,
            totalContacts: phoneNumbers.length,
            sent: successful.length,
            failed: failed.length,
            results: results,
            message: `SMS sent to ${successful.length} of ${phoneNumbers.length} contact(s)`
        });

    } catch (error) {
        console.error('❌ Error sending SMS:', error);

        res.status(500).json({
            error: 'Failed to send SMS',
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 CoastGuard AI Backend running on http://localhost:${PORT}`);
    console.log(`📱 SMS endpoint: http://localhost:${PORT}/api/send-sms`);

    // Check Twilio configuration
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        console.warn('⚠️  Twilio credentials not configured. SMS functionality will not work.');
        console.warn('   Please update the .env file with your Twilio credentials.');
    }
});
