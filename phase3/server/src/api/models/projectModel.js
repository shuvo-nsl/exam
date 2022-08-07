const {Schema, model} = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const projectSchema = Schema({
    title: {
        type: String,
    },
    
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },

    description: {
        type: String
    },

    projectLead: {
        type: String,
    },

}, {timestamps: true});

projectSchema.plugin(autopopulate)
module.exports = model("Project", projectSchema);