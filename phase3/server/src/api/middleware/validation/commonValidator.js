const { body } = require("express-validator");
// const { capitalizeFirstLetter } = require("../../helpers/commonHelper");
//validation for sign in
module.exports.signInBodyValidation = [
    body("nslId")
        .notEmpty().withMessage("Nsl id required")
        .isLength({ min: 3 }).withMessage("id must be greater than 3"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 5 }).withMessage("Must be 5 Characters")
]
//create new user by admin
module.exports.newUserValidation = [
    body("nslId")
        .notEmpty().withMessage("Nsl id required")
        .isLength({ min: 3 }).withMessage("id must be greater than three characters"),
        body("name")
        .notEmpty().withMessage("Name required")
        .isLength({ min: 3 }).withMessage("name must be three characters"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 5 }).withMessage("Must be five characters")
]

//validation for create project
module.exports.projectCreateValidation = [
    body("title").notEmpty().withMessage("Title is required")
    .isLength({min:3}).withMessage("title must have 3 character"),
    body("description").notEmpty().withMessage("Description required"),
    body("startDate").notEmpty().withMessage("Required").isDate().withMessage("please insert date"),
    body("endDate").notEmpty().withMessage("Required").isDate().withMessage("please insert date"),
    body("projectLead").notEmpty().withMessage("Required")    
]

module.exports.projectTitleValidation = body("title").notEmpty().withMessage("Title required");