const express = require('express');
const router = express.Router();
const passport = require('passport');
const projectcontroller = require('../controllers/project_controller');

router.post('/create-project',passport.checkAuthentication , projectcontroller.create);

module.exports = router;