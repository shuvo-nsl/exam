const Project = require("../models/projectModel");
const { isErrorFounds, validationMessages } = require("../utils/errorHelper");
const { validationResult } = require("express-validator")
const User = require("../models/userModel");

module.exports.createProject = async (req, res) => {
   try {const errors = validationMessages(validationResult(req).mapped());
    if (isErrorFounds(errors)) return res.status(400).json(errors)
    if(req.user.role !== "admin") return res.status(400).json({"message": "You are not authorize to create the project"})
    const { title,description,startDate,endDate,projectLead} = req.body
    const project = await Project.findOne({ title });
    
    if (project) return res.status(400).json({ "message": "Already title exist" });
    const result = await new Project({title, description, startDate, endDate, projectLead}).save();
    return res.status(201).json({ "message": "Project create successfully", "data": result });
   }catch(err){
    console.log(err);
    return res.status(500).json({ "message": "Something went wrong",});

   }
};

module.exports.updateAProject = async (req, res) => {
    try{
        
        const id = req.params.id;
        const project = await Project.findOne({ _id: id }).lean();
        if (!project) return res.status(400).json({ "message": "Project not found" });
        const {title, description, startDate, endDate} = req.body;
        // const isExistProject = await Project.findOne({title}).lean();
        // if(isExistProject) return res.status(400).json({"message": "Project name already exist"});
        const updatedProject = await Project.findOneAndUpdate({_id: id}, {$set: {
            description: description,
            startDate: startDate,
            endDate: endDate
        }}, {new: true})
        return res.status(200).json({"message": updatedProject})

    }catch(e){

        return res.status(500).json({ "message": "Not Updated" });
    }

};


module.exports.deleteSingleProject = async(req, res)=> {
    try{

        const id = req.params.id;
        const project = await Project.findOne({_id: id});
        if(!project) return res.status(400).json({"message": "Project not found"});
        await Project.findOneAndDelete({_id: id});
        return res.status(201).json({"message": "Deleted successfully"});
    }catch(err){
        return res.status(500).json({"message": "Something went wrong"})
    }
    
}


module.exports.getAllProjects = async(req, res)=> {
    try{
        console.log(req.query);
        if(!Object.entries(req.query).length){
            const projects = await Project.find({}).lean();
            if(!projects.length) return res.status(400).json({"message": "Projects ot found"});
            return res.status(200).json({"data": projects})
        }

        const projectLead = req.query.projectLead?req.query.projectLead: "";
        const startDate = req.query.startDate?req.query.startDate: "1970-01-01";
        const endDate = req.query.endDate?req.query.endDate: "2030-01-01";
        const projects = await Project.find({
            projectLead: new RegExp('^'+projectLead,'i'),
            startDate: {
                $gte: new Date(startDate)
            },
            endDate: {
                $lte: new Date(endDate)
            }
         
        });
        if(!projects.length) return res.status(400).json({"message": "Projects not found"})
        return res.status(200).json({"data": projects})
    }catch(err){
        console.log(err);
        return res.status(500).json({"message": "Something went wrong"})

    }
    const projects = await Project.find().select({__v:0, createdAt: 0, updatedAt: 0});
    if(projects.length) return res.status(200).json({"data": projects})
    return res.status(400).json({"message": "No projects found"})
}

module.exports.getAProject = async (req, res) => {
    try{
        const pId = req.params.id;
        const project = await Project.findOne({ _id: pId });
        if (!project) return res.status(400).json({ "message": "Project not found" });
        return res.status(200).json({ "data": project });
    }catch(err){
        return res.status(500).json({"message": "Something went wrong"})

    }
};