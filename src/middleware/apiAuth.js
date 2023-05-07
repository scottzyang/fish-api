const User = require('../models/user');

const apiAuth = async (req, res, next) => {

  if (req.url === '/user/register' || req.url === '/user/auth') {
    return next();
  }

  console.log("Checking API Key...")

  const apiKey = req.header("x-api-key"); // add user inputted API key to headers
  if (!apiKey) {
    return res.status(400).json({ message: "API Key not found in header." })
  }
  const account = await User.findOne({apiKey}); // search database for matching API key

  if (account) {
    next()
  } else {
    return res.status(401).json({  message: "Not authorized. Incorrect API Key."})
  }
}


module.exports = apiAuth;
