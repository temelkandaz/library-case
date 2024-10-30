const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the REST API! 1');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
