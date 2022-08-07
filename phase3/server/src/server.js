require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./api/configuration/app");
const PORT = process.env.PORT || 3001 ;

const production_DB = process.env.global_DB;
const local_DB = "mongodb://localhost:27017/exam-test"; //local db url

//db connection
(async function dbConnection(url){
   await mongoose.connect(url);

})(production_DB).then(()=> console.log("Successfully DB Connected"))
    .catch(err => console.log("DB Not Connected"))

app.listen(PORT, ()=>{
   console.log(`Listening on Port ${PORT}`);
})