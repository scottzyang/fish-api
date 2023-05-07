const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authController = {
  signUp: async (req, res) => {
    try {
      // Verify if user exists by email
      const existingUser = await User.findOne(req.body);

      if (existingUser) {
        return res.status(409).json({ message: "User with that email already exists. Please login or use a different email." });
      }

      // Create user with JWT
      const user = await new User(req.body);
      user.save();
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '20 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      return res.status(200).json({user})
    } catch (err) {
      return res.status(404).json({ message: err.message });
    };
  },

  login: async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = await User.findOne({ email }, 'username password');
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
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      return res.status(200).json({user});
    })
    } catch (error) {
      return res.status(404).json({ message: err.message });
    }
  },

  logout: async (req, res) => {
    res.clearCookie('nToken');
    return res.status(200).json({ message: "Logged out successfully." });
  }

}

module.exports = authController;
