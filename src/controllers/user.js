const User = require('../models/user');
const jwt = require('jsonwebtoken');

// generate apiKey, generate random alphanumeric string
const generateAPIKey = () => {
  return crypto.randomUUID();
}

const userController = {
  register: async (req, res) => {
    try {
      // Verify if user exists by email
      const existingUser = await User.findOne({ email: req.body.email}).exec();

      if (existingUser) {
        return res.status(409).json({ message: "User with that email already exists. Please login or use a different email." });
      }

      // Create user with JWT
      const newUser = { ...req.body, apiKey: generateAPIKey()};
      const user = new User(newUser);
      await user.save();
      return res.status(200).json({apiKey: user.apiKey});
    } catch (err) {
      return res.status(404).json({ message: err.message });
    };
  },

  auth: async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = await User.findOne({ email }, 'username password apiKey');
      if (!user) {
        return res.status(401).json({ message: "Incorrect username or password" });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect username or password" });
      }
      const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
        expiresIn: '20 days',
      });
      return res.status(200).json({apiKey: user.apiKey, token});
    })
    } catch (error) {
      return res.status(404).json({ message: err.message });
    }
  },
}

module.exports = userController;
