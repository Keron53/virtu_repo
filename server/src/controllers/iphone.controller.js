const pool = require('../db');

const createIPhone = async (req, res, next) => {
    try {
        const { imei, id_modelo, capacidad, color, bateria, vendido, sellado, fecha_llegada, fecha_salida } = req.body;

        const newIPhone = await pool.query(
            "INSERT INTO IPhone (imei, id_modelo, capacidad, color, bateria, vendido, sellado, fecha_llegada, fecha_salida) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [
                imei,
                id_modelo,
                capacidad,
                color,
                bateria,
                vendido,
                sellado,
                fecha_llegada,
                fecha_salida
            ]
        );

        res.json(newIPhone.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllIPhone = async (req, res, next) => {
    try {
        const allIPhone = await pool.query("SELECT * FROM IPhone ORDER BY id_iphone DESC");
        res.json(allIPhone.rows);
    } catch (error) {
        next(error);
    }
}

const getIPhone = async (req, res, next) => {
    try {
        const { id_iphone } = req.params;
        const result = await pool.query("SELECT * FROM IPhone WHERE id_iphone = $1", [id_iphone]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "IPhone not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getIPhoneByModel = async (req, res, next) => {
    try {
        const { id_modelo } = req.params;
        const result = await pool.query("SELECT * FROM IPhone WHERE id_modelo = $1 ORDER BY id_iphone DESC", [id_modelo]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "No iPhones found with the specified model ID" });

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getIPhoneByIMEI = async (req, res, next) => {
    try {
        const { imei } = req.params;
        const result = await pool.query("SELECT * FROM IPhone WHERE imei = $1", [imei]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "No iPhone found with the specified IMEI" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getIPhoneByColor = async (req, res, next) => {
    try {
        const { color } = req.params;
        const result = await pool.query("SELECT * FROM IPhone WHERE color ILIKE $1 ORDER BY id_iphone DESC", [`%${color}%`]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "No iPhones found with the specified color" });

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getIPhoneNotSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM IPhone WHERE vendido = false ORDER BY id_iphone DESC");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getIPhoneSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM IPhone WHERE vendido = true ORDER BY id_iphone DESC");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const updateIPhone = async (req, res, next) => {
    try {
        const { id_iphone } = req.params;
        const { imei, id_modelo, capacidad, color, bateria, vendido, sellado, fecha_llegada, fecha_salida } = req.body;

        const result = await pool.query(
            "UPDATE IPhone SET imei = $1, id_modelo = $2, capacidad = $3, color = $4, bateria = $5, vendido = $6, sellado = $7, fecha_llegada = $8, fecha_salida = $9 WHERE id_iphone = $10 RETURNING *",
            [imei, id_modelo, capacidad, color, bateria, vendido, sellado, fecha_llegada, fecha_salida, id_iphone]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "IPhone not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteIPhone = async (req, res, next) => {
    try {
        const { id_iphone } = req.params;
        const result = await pool.query("DELETE FROM IPhone WHERE id_iphone = $1", [id_iphone]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "IPhone not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createIPhone,
    getAllIPhone,
    getIPhone,
    getIPhoneByModel,
    getIPhoneByIMEI,
    getIPhoneByColor,
    getIPhoneNotSold,
    getIPhoneSold,
    updateIPhone,
    deleteIPhone
}
