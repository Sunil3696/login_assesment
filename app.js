const express = require("express");
var bodyParser = require('body-parser');
require("./dbinit")
const app = express();
const cors = require("cors")



app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

//import route
const authRoutes = require("./routes/auth.routes");
//mounting route
app.use('/auth', authRoutes);





// testing route
app.use('/test', (req, res)=> {
    res.json("Testing route");
})



app.listen(3003, "localhost", function (err, succ) {
    if (err) {
        console.log("Server can not be started");
    }
    else {
        console.log("server has been started at port 3003")
    }
})