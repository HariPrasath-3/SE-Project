const Project = require('../models/project');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.dashboard = async (req, res) => {
    try{        
        return res.render('dashboard', {
            title: "Dashboard",
            page: "dashboard_home",
            user: req.user
        });
    }catch(err){
        console.log("Error in creating project...\n", err);
    }
};

module.exports.projects = async (req, res) => {
    try{
        let project = await Project.find({}).populate('createdBy');
        let date = Date(project.due);
        return res.render('dashboard_projects', {
            title: "Dashboard",
            page: "dashboard_projects",
            user: req.user,
            projects: project,
            dueDate: date.substring(0,15)
        });
    }catch(err){
        console.log("Error in creating project...\n", err);
    }
}

module.exports.profile = async (req, res) => {
    try{
        return res.render('dashboard_profile', {
            title: "Dashboard",
            page: "dashboard_profile",
            user: req.user,
        });
    }catch(err){
        console.log("Error in creating project...\n", err);
    }
}
module.exports.users = async (req, res) => {
    let admin_user = await User.find({role: 'student'});
    try{
        return res.render('dashboard_admin_users', {
            title: "Dashboard",
            page: "dashboard_admin_users",
            user: req.user,
            users: admin_user
        });
    }catch(err){
        console.log("Error in creating project...\n", err);
    }
}

module.exports.createProject = (req, res) => {
    return res.render('dashboard_create_project', {
        title: "Create_Project",
        user: req.user
    });
}

module.exports.projectDetails = async (req, res) => {
    var projectID = req.params['id'];
    let project = await Project.findById(projectID).populate('createdBy');
    let date = Date(project.createdAt);
    console.log(project.createdBy);
    console.log(project);
    try{
        if(req.user.role == "student"){
            return res.render('dashboard_stud_project_details', {
                title: "Project_Details",
                project: project,
                date: date.substring(0,15)          
            })
        }else if(req.user.role == "teacher"){
            return res.render('dashboard_teac_project_details', {
                title: "Project_Details",
                project: project,
                date: date.substring(0,15)
            })
        }
    }catch(err){
        console.log("Error in viewing project details...\n", err);
    }
}

module.exports.downloadFile = (req, res) => {
    var filepath = path.join(__dirname, '../uploads', req.params['path']);
    var file = fs.createReadStream(filepath);
    var stat = fs.statSync(filepath);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=table1.pdf');
    file.pipe(res);
}
