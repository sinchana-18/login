
const User = require('../models/user');


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered. Please use a different email.' });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Error saving user to database', details: err.message });
    }
}

