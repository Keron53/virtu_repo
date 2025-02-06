const { Router } = require('express');
const { 
    createMacBook, 
    getAllMacBooks, 
    getMacBook, 
    getMacBookSold,
    getMacBookNotSold,
    updateMacBook, 
    deleteMacBook 
} = require('../controllers/macbook.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/macbook/post', verifyToken, checkRole(['admin']), createMacBook);

router.get('/macbook/get', verifyToken, checkRole(['admin', 'operador']), getAllMacBooks);

router.get('/macbook/get/:id_macbook', verifyToken, checkRole(['admin', 'operador']), getMacBook);

router.get('/macbook/notsold', verifyToken, checkRole(['admin', 'operador']), getMacBookNotSold);

router.get('/macbook/sold', verifyToken, checkRole(['admin', 'operador']), getMacBookSold);

router.put('/macbook/put/:id_macbook', verifyToken, checkRole(['admin', 'operador']), updateMacBook);

router.delete('/macbook/delete/:id_macbook', verifyToken, checkRole(['admin', 'operador']), deleteMacBook);

module.exports = router;
