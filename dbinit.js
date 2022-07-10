const mongoose = require("mongoose");
//using mongodb atlas as database
const dbURL = "mongodb+srv://sunil:B3ast0022@loginAssignment.wfcubpx.mongodb.net/?retryWrites=true&w=majority";



mongoose.connect(dbURL, function(err, succ){
    if(err){
        console.log(err);
    }
    else{
        console.log("mongoose has beed connected successfully");
    }
})