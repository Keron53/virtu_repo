const { Router } = require('express');
const { 
    createAppleWatch, 
    getAllAppleWatches, 
    getAppleWatch,
    getAppleWatchesNotSold,
    getAppleWatchesSold,
    updateAppleWatch, 
    deleteAppleWatch 
} = require('../controllers/applewatch.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/applewatch/post', verifyToken, checkRole(['admin']), createAppleWatch);

router.get('/applewatch/get', verifyToken, checkRole(['admin', 'operador']), getAllAppleWatches);

router.get('/applewatch/get/:id_applewatch', verifyToken, checkRole(['admin', 'operador']), getAppleWatch);

router.get('/applewatch/notsold', verifyToken, checkRole(['admin', 'operador']), getAppleWatchesNotSold);

router.get('/applewatch/sold', verifyToken, checkRole(['admin', 'operador']), getAppleWatchesSold);

router.put('/applewatch/put/:id_applewatch', verifyToken, checkRole(['admin', 'operador']), updateAppleWatch);

router.delete('/applewatch/delete/:id_applewatch', verifyToken, checkRole(['admin', 'operador']), deleteAppleWatch);

module.exports = router;
