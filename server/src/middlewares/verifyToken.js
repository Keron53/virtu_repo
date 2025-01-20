const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añade los datos del usuario al objeto `req`
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido o expirado." });
    }
};

module.exports = verifyToken;
