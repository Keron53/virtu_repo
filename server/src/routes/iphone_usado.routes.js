const { Router } = require('express');
const { 
    createIPhoneUsed, 
    getAllIPhoneUsed, 
    getIPhoneUsed, 
    getIPhoneUsedNotSold,
    getIPhoneUsedSold,
    updateIPhoneUsed, 
    deleteIPhoneUsed 
} = require('../controllers/iphone_usado.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/iphoneused/post', verifyToken, checkRole(['admin']), createIPhoneUsed);

router.get('/iphoneused/get', verifyToken, checkRole(['admin', 'operador']), getAllIPhoneUsed);

router.get('/iphoneused/get/:id_iphone_usado', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsed);

router.get('/iphoneused/sold', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsedSold);

router.get('/iphoneused/notsold', verifyToken, checkRole(['admin', 'operador']), getIPhoneUsedNotSold);

router.put('/iphoneused/put/:id_iphone_usado', verifyToken, checkRole(['admin', 'operador']), updateIPhoneUsed);

router.delete('/iphoneused/delete/:id_iphone_usado', verifyToken, checkRole(['admin', 'operador']), deleteIPhoneUsed);

module.exports = router;
