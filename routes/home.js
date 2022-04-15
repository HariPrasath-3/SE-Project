const express = require('express');
const router = express.Router();
const homecontroller = require('../controllers/home_controller');

router.get('/', homecontroller.home);

router.use('/user', require('./user'));
router.use('/dashboard', require('./dashboard'));
router.use('/project', require('./project'));

module.exports = router;