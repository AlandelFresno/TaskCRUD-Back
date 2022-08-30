const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.headers['authorization'] || req.headers['Authorization'];

  if (!accessToken) {
    return res.status(401).json({
      res: false,
      error: 'Unauthorized',
    });
  }

  if (!accessToken.toLowerCase().startsWith('bearer ')) {
    return res.status(400).json({
      res: false,
      error: 'Authorization header must be Bearer <token>',
    });
  }
  const token = accessToken.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({
        res: false,
        error: 'Forbidden, token expired or incorrect',
      });
    } else {
      req.token = accessToken;
      next();
    }
  });
};

module.exports = validateToken;
