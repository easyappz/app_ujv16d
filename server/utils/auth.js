const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT signing (hardcoded as per instructions)
const JWT_SECRET = 'my-very-secure-secret-key-1234567890';
// Token expiration time (1 hour)
const TOKEN_EXPIRY = '1h';

/**
 * Hash a password using bcrypt
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} - The hashed password
 */
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - The plain text password
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - True if passwords match, false otherwise
 */
const comparePasswords = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
};

/**
 * Generate a JWT token for a user
 * @param {Object} user - The user object containing the user ID
 * @returns {string} - The generated JWT token
 */
const generateToken = (user) => {
  try {
    const payload = {
      id: user._id,
      email: user.email
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    return token;
  } catch (error) {
    throw new Error('Error generating token: ' + error.message);
  }
};

/**
 * Verify a JWT token
 * @param {string} token - The token to verify
 * @returns {Object} - The decoded token payload if valid
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token: ' + error.message);
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
  JWT_SECRET
};
