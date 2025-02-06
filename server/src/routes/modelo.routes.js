const { Router } = require('express');
const { 
    createModel, 
    getAllModels, 
    getModel, 
    updateModel, 
    deleteModel 
} = require('../controllers/modelo.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/modelo/post', verifyToken, checkRole(['admin']), createModel);

router.get('/modelo/get', verifyToken, checkRole(['admin', 'operador']), getAllModels);

router.get('/modelo/get/:id_modelo', verifyToken, checkRole(['admin', 'operador']), getModel);


router.put('/modelo/put/:id_modelo', verifyToken, checkRole(['admin']), updateModel);

router.delete('/modelo/delete/:id_modelo', verifyToken, checkRole(['admin']), deleteModel);

module.exports = router;
