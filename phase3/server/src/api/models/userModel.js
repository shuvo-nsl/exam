const mongoose= require('mongoose');
const {Schema, model} = mongoose;
const jwt = require('jsonwebtoken');


const userSchema = Schema({
    name: {
        type: String,
    },
    nslId: {
        type: String,
        unique: true
    },
    password:{
        type:String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'
    },
},{timestamps: true});

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        nslId: this.nslId,
        role: this.role,
        name: this.name,
    },process.env.JWT_SECRET_KEY, {expiresIn: '1d' })
    return token;
}
userSchema.methods.findAllTeamLead = function(){
    return mongoose.model("User").find({role: "teamlead"});
}
userSchema.methods.findAllTeamMember = function(){
    return mongoose.model("User").find({role: 'user'});
}


module.exports = model("User",userSchema);
