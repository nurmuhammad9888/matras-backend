const { verify } = require("../lib/jwt");
const model = require("../models/login");

exports.checkToken = async (req, res, next) => {
    // 1. Tokenni to'g'ri olish
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            message: "You are not logged in, please try again!" 
        });
    }

    try {
        // 2. Tokenni tekshirish
        const payload = verify(token, process.env.SECRET_KEY);
        
        // 3. Admin tekshiruvi
        const admin = await model.getId();
        if (payload.id !== admin.id) {
            return res.status(401).json({ 
                message: "Invalid permissions!" 
            });
        }

        // 4. Keyingi middlewarega o'tish
        req.user = payload; // Foydalanuvchi ma'lumotlarini saqlash
        next();
        console.log('Incoming token:', token);
        console.log('Decoded payload:', payload);
        
    } catch (error) {
        // 5. Xatoliklarni to'g'ri ishlash
        console.error('JWT Error:', error.message);
        return res.status(401).json({ 
            message: "Invalid token. Please log in again." 
        });
    }
};