const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const bot_token = "6810567690:AAGC8ce3Zxq4MS0KCv8h8h9tQwkun_TbDk4"

app.use(bodyParser.json());

app.post('/send-otp', async (req, res) => {
    console.log(req.body);
    const { userId, otp } = req.body; 
    if (!userId || !otp) {
        return res.status(400).send({ success: false, message: 'Missing userId or otp.' });
    }
    
    try {
        const url = "https://api.telegram.org/bot" + bot_token + "/sendMessage"
        const response = await axios.post(url, {
            chat_id: userId,
            text: `Ваш код подтверждения: ${otp}`
        });

        res.send({ success: true, message: 'OTP sent successfully.' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send({ success: false, message: 'Failed to send OTP.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
