const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../controllers/dashboard_controller');
const passport = require('passport');


router.get('/create-project', passport.checkAuthentication, dashboardcontroller.createProject);
router.get('/', dashboardcontroller.dashboard);
router.get('/download/:path', dashboardcontroller.downloadFile)
module.exports = router;