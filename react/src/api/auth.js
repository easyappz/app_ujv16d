import { instance } from './axios';

/**
 * Register a new user
 * @param {Object} userData - User data for registration
 * @param {string} userData.name - User's name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} Response data from server
 */
export const register = async (userData) => {
  try {
    const response = await instance.post('/api/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка при регистрации');
  }
};

/**
 * Login a user
 * @param {Object} credentials - User credentials for login
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} Response data from server
 */
export const login = async (credentials) => {
  try {
    const response = await instance.post('/api/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка при входе');
  }
};

/**
 * Request password reset instructions
 * @param {Object} data - Data for password reset request
 * @param {string} data.email - User's email
 * @returns {Promise<Object>} Response data from server
 */
export const forgotPassword = async (data) => {
  try {
    const response = await instance.post('/api/forgot-password', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка при запросе восстановления пароля');
  }
};

/**
 * Fetch user profile data
 * @returns {Promise<Object>} Response data from server
 */
export const getProfile = async () => {
  try {
    const response = await instance.get('/api/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка при получении данных профиля');
  }
};
