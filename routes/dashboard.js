const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../controllers/dashboard_controller');
const passport = require('passport');


router.get('/create-project', passport.checkAuthentication, dashboardcontroller.createProject);
router.get('/', dashboardcontroller.dashboard);
router.get('/profile', dashboardcontroller.profile);
router.get('/projects', dashboardcontroller.projects);
router.get('/createproject', dashboardcontroller.createProject);
router.get('/project_details/:id', dashboardcontroller.projectDetails)
router.get('/admin_users', dashboardcontroller.users);
router.get('/download/:path', dashboardcontroller.downloadFile);

module.exports = router; 