const { Router } = require('express');
const { 
    createIPad, 
    getAllIPads, 
    getIPad, 
    getIPadsNotSold,
    getIPadsSold,
    updateIPad, 
    deleteIPad 
} = require('../controllers/ipad.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/ipad/post', verifyToken, checkRole(['admin']), createIPad);

router.get('/ipad/get', verifyToken, checkRole(['admin', 'operador']), getAllIPads);

router.get('/ipad/get/:id_ipad', verifyToken, checkRole(['admin', 'operador']), getIPad);

router.get('/ipad/notsold', verifyToken, checkRole(['admin', 'operador']), getIPadsNotSold);

router.get('/ipad/sold', verifyToken, checkRole(['admin', 'operador']), getIPadsSold);

router.put('/ipad/put/:id_ipad', verifyToken, checkRole(['admin', 'operador']), updateIPad);

router.delete('/ipad/delete/:id_ipad', verifyToken, checkRole(['admin', 'operador']), deleteIPad);

module.exports = router;
