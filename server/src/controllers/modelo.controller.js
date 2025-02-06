const pool = require('../db');

const createModel = async (req, res, next) => {
    try {
        const { nombre_modelo } = req.body;

        const newModelo = await pool.query(
            "INSERT INTO Modelo (nombre_modelo) VALUES($1) RETURNING *",
            [nombre_modelo]
        );

        res.json(newModelo.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllModels = async (req, res, next) => {
    try {
        const allModelos = await pool.query("SELECT * FROM Modelo ORDER BY id_modelo DESC");
        res.json(allModelos.rows);
    } catch (error) {
        next(error);
    }
}

const getModel = async (req, res, next) => {
    try {
        const { id_modelo } = req.params;
        const result = await pool.query("SELECT * FROM Modelo WHERE id_modelo = $1", [id_modelo]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Modelo not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateModel = async (req, res, next) => {
    try {
        const { id_modelo } = req.params;
        const { nombre_modelo } = req.body;

        const result = await pool.query(
            "UPDATE Modelo SET nombre_modelo = $1 WHERE id_modelo = $2 RETURNING *",
            [nombre_modelo, id_modelo]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Modelo not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteModel = async (req, res, next) => {
    try {
        const { id_modelo } = req.params;
        const result = await pool.query("DELETE FROM Modelo WHERE id_modelo = $1", [id_modelo]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Modelo not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createModel,
    getAllModels,
    getModel,
    updateModel,
    deleteModel
}
