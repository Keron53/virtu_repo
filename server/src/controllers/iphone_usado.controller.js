const pool = require('../db');

const createIPhoneUsed = async (req, res, next) => {
    try {
        const { imei, id_modelo, capacidad, color, bateria, estado_fisico, vendido, detalles, fecha_llegada } = req.body;

        const newIPhoneUsado = await pool.query(
            "INSERT INTO IPhone_Usado (imei, id_modelo, capacidad, color, bateria, estado_fisico, vendido, detalles, fecha_llegada) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [imei, id_modelo, capacidad, color, bateria, estado_fisico, vendido, detalles, fecha_llegada]
        );

        res.json(newIPhoneUsado.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllIPhoneUsed = async (req, res, next) => {
    try {
        const allIPhoneUsados = await pool.query("SELECT * FROM IPhone_Usado ORDER BY id_iphone_usado DESC");
        res.json(allIPhoneUsados.rows);
    } catch (error) {
        next(error);
    }
}

const getIPhoneUsed = async (req, res, next) => {
    try {
        const { id_iphone_usado } = req.params;
        const result = await pool.query("SELECT * FROM IPhone_Usado WHERE id_iphone_usado = $1", [id_iphone_usado]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "IPhone not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getIPhoneUsedNotSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM IPhone_Usado WHERE vendido = false ORDER BY id_iphone_usado DESC");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getIPhoneUsedSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM IPhone_Usado WHERE vendido = true ORDER BY id_iphone_usado DESC");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const updateIPhoneUsed = async (req, res, next) => {
    try {
        const { id_iphone_usado } = req.params;
        const { imei, id_modelo, capacidad, color, bateria, estado_fisico, vendido, detalles, fecha_llegada, fecha_salida } = req.body;

        const result = await pool.query(
            "UPDATE IPhone_Usado SET imei = $1, id_modelo = $2, capacidad = $3, color = $4, bateria = $5, estado_fisico = $6, vendido = $7, detalles = $8, fecha_llegada = $9, fecha_salida = $10 WHERE id_iphone_usado = $11 RETURNING *",
            [imei, id_modelo, capacidad, color, bateria, estado_fisico, vendido, detalles, fecha_llegada, fecha_salida, id_iphone_usado]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "IPhone not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteIPhoneUsed = async (req, res, next) => {
    try {
        const { id_iphone_usado } = req.params;
        const result = await pool.query("DELETE FROM IPhone_Usado WHERE id_iphone_usado = $1", [id_iphone_usado]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "IPhone not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createIPhoneUsed,
    getAllIPhoneUsed,
    getIPhoneUsed,
    getIPhoneUsedNotSold,
    getIPhoneUsedSold,
    updateIPhoneUsed,
    deleteIPhoneUsed
}
