Project = require("../models/project");

module.exports.create =  async (req, res) => {
    Project.upload(req, res, (err) => {
        Project.create({
            name: req.body.name,
            description: req.body.description,
            createdBy: req.user._id,
            question: req.files.question[0].filename,
            totalmark: req.body.score,
            due: req.body.dueDate
        });
        if(err){
            console.log(err);
        }        
    });      
    return res.redirect("/dashboard");
}

module.exports.review =  async (req, res) => {
    return res.render("dashboard_Project_review");
}