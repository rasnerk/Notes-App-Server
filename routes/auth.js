const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/register', authController.registerUser)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/validate', authController.validateSession)

module.exports = router;