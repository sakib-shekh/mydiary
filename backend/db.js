const mongoose = require('mongoose')

module.exports.hi1=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/inotebook?directConnection=true");
    console.log("connected"); 
}

 