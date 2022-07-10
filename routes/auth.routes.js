const express = require("express");
const app = express();
const multer = require("multer");
let formHandler = multer();

const authController = require("../controllers/auth.controller");
const authCtrl = new authController();


app.post('/register', formHandler.none(), authCtrl.register);
app.post('/login', formHandler.none(), authCtrl.login);

module.exports = app;




