const express = require('express');
const router = express.Router();
const passport = require('passport');
const Project = require("../models/project");
const projectcontroller = require('../controllers/project_controller');

router.post('/create-project', projectcontroller.create);
router.get('/project-review', projectcontroller.review);

module.exports = router;