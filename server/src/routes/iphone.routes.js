const { Router } = require('express');
const { 
    createIPhone,
    getAll,
    getAllIPhone, 
    getIPhone, 
    getIPhoneByModel,
    getIPhoneByIMEI,
    getIPhoneByColor,
    getIPhoneNotSold,
    getIPhoneSold,
    updateIPhone, 
    deleteIPhone } = require('../controllers/iphone.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/getall', verifyToken, checkRole(['admin', 'operador']), getAll);

router.post('/iphone/post', verifyToken, checkRole(['admin']), createIPhone);

router.get('/iphone/get', verifyToken, checkRole(['admin', 'operador']), getAllIPhone);

router.get('/iphone/get/:id_iphone', verifyToken, checkRole(['admin', 'operador']), getIPhone);

router.get('/iphone/model/:id_modelo', verifyToken, checkRole(['admin', 'operador']), getIPhoneByModel);

router.get('/iphone/imei/:imei', verifyToken, checkRole(['admin', 'operador']), getIPhoneByIMEI);

router.get('/iphone/color/:color', verifyToken, checkRole(['admin', 'operador']), getIPhoneByColor);

router.get('/iphone/sold', verifyToken, checkRole(['admin', 'operador']), getIPhoneSold);

router.get('/iphone/notsold', verifyToken, checkRole(['admin', 'operador']), getIPhoneNotSold);

router.put('/iphone/put/:id_iphone', verifyToken, checkRole(['admin']), updateIPhone);

router.delete('/iphone/delete/:id_iphone', verifyToken, checkRole(['admin']), deleteIPhone);



module.exports = router;