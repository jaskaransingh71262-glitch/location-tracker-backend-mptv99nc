const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
let locations = [];
let idCounter = 0;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.post('/api/locations', (req, res) => {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    const newLocation = { id: idCounter++, latitude, longitude };
    locations.push(newLocation);
    res.json(newLocation);
});

app.get('/api/locations', (req, res) => {
    res.json({ locations });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});