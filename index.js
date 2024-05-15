const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios')

const app = express();
dotenv.config();
app.use(express.json());

const allowedOrigin = 'http://127.0.0.1:5500'

const corsOptions = {
    origin: allowedOrigin
};

app.use(cors(corsOptions));

app.get('/place-details', async (req, res) => {
    try {
        const placeId = process.env.place_id;
        const apiKey = process.env.api_key;
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
        const response = await axios.get(url)
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Tour Proxy Server</h1>')
})

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
