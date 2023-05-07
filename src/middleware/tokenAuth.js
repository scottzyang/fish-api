const jwt = require('jsonwebtoken');


// check authentication, used for routes that require auth.
const tokenAuth = (req, res, next) => {
  // access authorization within headers and grab token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  // skip token requirement upon login and signup
  if (req.url === '/user/register' || req.url === '/user/auth') {
    return next();
  }

  console.log('Checking token authorization...');

  // verify that token is present
  if (token == null) {
    return res.status(401).json({ message: "Not authorized. No bearer token in header." });
  }

  // verify that token is valid.
  jwt.verify(token, process.env.SECRET, (err, _) => {
    console.log(err)

    if (err) {
      return res.status(403).json({ message: "Not authorized. Token is invalid." })
    }

    next();
  });
};

module.exports = tokenAuth;
