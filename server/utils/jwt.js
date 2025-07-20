const jwt = require('jsonwebtoken');

const JWT_SECRET = 'my-secret-key-1234567890';
const JWT_EXPIRES_IN = '1h';

// Generate JWT token
function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
