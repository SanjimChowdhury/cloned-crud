var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')
const homeController = require('../controllers/home') 

router.get('/', homeController.getDrop)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
/*  function(req, res, next) {
  res.render('login');
}); */

module.exports = router;