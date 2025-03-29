const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY || 'your_strong_fallback_secret';
const DEFAULT_OPTIONS = {
    expiresIn: '1h',
    algorithm: 'HS256'
};

module.exports = {
    /**
    * Yangi JWT token yaratish
    * @param {Object} payload - Tokenga kiritiladigan ma'lumotlar
    * @param {Object} [options] - JWT options (optional)
    * @returns {String} - Token
    */
    sign: (payload, options = {}) => {
        return jwt.sign(payload, secretKey, { ...DEFAULT_OPTIONS, ...options });
    },
    
    /**
    * Tokenni tekshirish
    * @param {String} token - Tekshiriladigan token
    * @returns {Object|null} - Decoded payload yoki null (xato bo'lsa)
    */
    verify: (token) => {
        try {
            return jwt.verify(token, secretKey);
        } catch (err) {
            console.error('JWT Error:', err.message);
            return null;
        }
    },
    
    /**
    * Tokendan ma'lumot olish (verify without throwing)
    * @param {String} token
    * @returns {Object|false} - Decoded payload yoki false
    */
    decode: (token) => {
        try {
            return jwt.decode(token);
        } catch {
            return false;
        }
    }
};