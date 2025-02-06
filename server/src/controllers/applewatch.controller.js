const pool = require('../db');

const createAppleWatch = async (req, res, next) => {
    try {
        const { serial_num, id_modelo, num_modelo, color, tipo, lte_gps, vendido, fecha_llegada } = req.body;

        const newAppleWatch = await pool.query(
            "INSERT INTO AppleWatch (serial_num, id_modelo, num_modelo, color, tipo, lte_gps, vendido, fecha_llegada) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [serial_num, id_modelo, num_modelo, color, tipo, lte_gps, vendido, fecha_llegada]
        );

        res.json(newAppleWatch.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllAppleWatches = async (req, res, next) => {
    try {
        const allAppleWatches = await pool.query("SELECT * FROM AppleWatch ORDER BY id_applewatch DESC");
        res.json(allAppleWatches.rows);
    } catch (error) {
        next(error);
    }
}

const getAppleWatch = async (req, res, next) => {
    try {
        const { id_applewatch } = req.params;
        const result = await pool.query("SELECT * FROM AppleWatch WHERE id_applewatch = $1", [id_applewatch]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Apple Watch not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAppleWatchesNotSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM AppleWatch WHERE vendido = false ORDER BY id_applewatch DESC");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getAppleWatchesSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM AppleWatch WHERE vendido = true ORDER BY id_applewatch DESC"); 
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const updateAppleWatch = async (req, res, next) => {
    try {
        const { id_applewatch } = req.params;
        const { serial_num, id_modelo, num_modelo, color, tipo, lte_gps, vendido, fecha_llegada, fecha_salida } = req.body;

        const result = await pool.query(
            "UPDATE AppleWatch SET serial_num = $1, id_modelo = $2, num_modelo = $3, color = $4, tipo = $5, lte_gps = $6, vendido = $7, fecha_llegada = $8, fecha_salida = $9 WHERE id_applewatch = $10 RETURNING *",
            [serial_num, id_modelo, num_modelo, color, tipo, lte_gps, vendido, fecha_llegada, fecha_salida, id_applewatch]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Apple Watch not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteAppleWatch = async (req, res, next) => {
    try {
        const { id_applewatch } = req.params;
        const result = await pool.query("DELETE FROM AppleWatch WHERE id_applewatch = $1", [id_applewatch]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Apple Watch not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createAppleWatch,
    getAllAppleWatches,
    getAppleWatch,
    getAppleWatchesNotSold,
    getAppleWatchesSold,
    updateAppleWatch,
    deleteAppleWatch
}
