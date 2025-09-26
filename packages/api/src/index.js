const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// Define other API endpoints here

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});