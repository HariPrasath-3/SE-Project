const Project = require('../models/project');
const fs = require('fs');
const path = require('path');

module.exports.dashboard = async (req, res) => {
    try{
        let project = await Project.find({})
            .populate('createdBy');
        return res.render('dashboard', {
            title: "Dashboard",
            projects: project
        });
    }catch(err){
        console.log("Error in creating project...\n", err);
    }
};

module.exports.createProject = (req, res) => {
    return res.render('project', {
        title: "Create_Project",
    });
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