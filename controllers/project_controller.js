Project = require("../models/project");

module.exports.create =  async (req, res) => {
    
    Project.upload(req, res, (err) => {
        Project.create({
            name: req.body.name,
            createdBy: req.user._id,
            question: req.files.question[0].filename,
            mark: req.body.score,
            totalmark: req.body.obtainedScore,
            due: req.body.dueDate
        });
        if(err){
            console.log(err);
        }        
    });      
    return res.redirect("/dashboard");
}