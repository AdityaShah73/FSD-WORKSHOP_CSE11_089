const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const FILE_PATH = path.join(__dirname, 'users.json');

// Middleware
app.use(express.json());
app.use(cors());

// Helper function: Read users from JSON file
const readUsers = () => {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data || '[]');
};

// Helper function: Save users to JSON file
const writeUsers = (users) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
};

// 1. REGISTER ENDPOINT (Plain Text)
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    const users = readUsers();

    // Check if user already exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    // Save user directly with plain text password
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully!' });
});

// 2. LOGIN ENDPOINT (Plain Text Verification)
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    // Find user and compare plain text passwords directly
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Return a basic text string as the token since jsonwebtoken is removed
    res.status(200).json({
        token: 'authenticated-user-session-id',
        user: { id: user.id, name: user.name, email: user.email },
        message: 'Logged in successfully!'
    });
});

// 3. GET ALL REGISTERED USERS
app.get('/api/users', (req, res) => {
    const users = readUsers();

    // Do not expose passwords to the frontend
    const safeUsers = users.map(({ id, name, email }) => ({
        id,
        name,
        email
    }));

    res.status(200).json(safeUsers);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Simple backend running on http://localhost:${PORT}`);
});