import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Sample API endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});