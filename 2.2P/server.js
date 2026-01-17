const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// --- REST API to Add Two Numbers (Required for 2.2P) ---
app.get('/add', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: "Please provide valid numbers using ?a= and ?b=" });
    }

    const sum = a + b;

    res.json({
        operation: "addition",
        a: a,
        b: b,
        result: sum
    });
});

// Optional: other calculator endpoints
app.get('/multiply', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: "Provide valid numbers" });
    }

    res.json({ result: a * b });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
