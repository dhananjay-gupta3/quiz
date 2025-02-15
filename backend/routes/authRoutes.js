const express = require('express');
const router = express.Router();

const STATIC_CREDENTIALS = { username: 'admin', password: 'admin123' };

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === STATIC_CREDENTIALS.username && password === STATIC_CREDENTIALS.password) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
