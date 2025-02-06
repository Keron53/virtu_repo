const pool = require('../db');

const createMacBook = async (req, res, next) => {
    try {
        const { serial_num, id_modelo, num_modelo, capacidad, color, tipo, caracteristicas, vendido, fecha_llegada } = req.body;

        const newMacBook = await pool.query(
            "INSERT INTO MacBook (serial_num, id_modelo, num_modelo, capacidad, color, tipo, caracteristicas, vendido, fecha_llegada) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [serial_num, id_modelo, num_modelo, capacidad, color, tipo, caracteristicas, vendido, fecha_llegada]
        );

        res.json(newMacBook.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllMacBooks = async (req, res, next) => {
    try {
        const allMacBooks = await pool.query("SELECT * FROM MacBook ORDER BY id_macbook DESC");
        res.json(allMacBooks.rows);
    } catch (error) {
        next(error);
    }
}

const getMacBook = async (req, res, next) => {
    try {
        const { id_macbook } = req.params;
        const result = await pool.query("SELECT * FROM MacBook WHERE id_macbook = $1", [id_macbook]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "MacBook not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getMacBookNotSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM MacBook WHERE vendido = false ORDER BY id_macbook DESC");

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getMacBookSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM MacBook WHERE vendido = true ORDER BY id_macbook DESC");

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const updateMacBook = async (req, res, next) => {
    try {
        const { id_macbook } = req.params;
        const { serial_num, id_modelo, num_modelo, capacidad, color, tipo, caracteristicas, vendido, fecha_llegada, fecha_salida } = req.body;

        const result = await pool.query(
            "UPDATE MacBook SET serial_num = $1, id_modelo = $2, num_modelo = $3, capacidad = $4, color = $5, tipo = $6, caracteristicas = $7, vendido = $8, fecha_llegada = $9, fecha_salida = $10 WHERE id_macbook = $11 RETURNING *",
            [serial_num, id_modelo, num_modelo, capacidad, color, tipo, caracteristicas, vendido, fecha_llegada, fecha_salida, id_macbook]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "MacBook not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteMacBook = async (req, res, next) => {
    try {
        const { id_macbook } = req.params;
        const result = await pool.query("DELETE FROM MacBook WHERE id_macbook = $1", [id_macbook]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "MacBook not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createMacBook,
    getAllMacBooks,
    getMacBook,
    getMacBookNotSold,
    getMacBookSold,
    updateMacBook,
    deleteMacBook
}
