const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user_controller');
const user = require('../models/user');
const passport = require('passport');

router.get('/signin', usercontroller.signin);
router.get('/signup', usercontroller.signup);
router.post('/create_user', usercontroller.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'}
), usercontroller.createSession);
router.get('/signout', usercontroller.destroysession);
module.exports = router;