const User = require("../models/user.model");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const token = jwt.sign({
        email: user.email,
        name: user.name,
        status: user.status,
        user_id: user._id
    }, "Everest")
    return token;
}

class authController {
    register(req, res) {
        let data = req.body;

        if (req.body.status == null || req.body.status == "") {
            data.status = "inactive"
        }
        data.password = passwordHash.generate(req.body.password);

        let user = new User(data);

        user.save()
            .then((response) => {
                res.json({
                    result: response,
                    status: true,
                    message: "User account has been created"
                })
            })
            .catch((error) => {
                res.json({
                    result: error,
                    status: false,
                    message: "User Account can not be created at this time"
                })
            })
    }

    login(req, res) {
        let data = req.body;

        User.findOne(
            { email: data.email }
        )
            .then((usr) => {
                if (usr) {
                    let chkPwd = passwordHash.verify(data.password, usr.password);
                    if (chkPwd) {
                        if (usr.status == 'active') {
                            res.json({
                                result: usr,
                                status: true,
                                token: generateToken(usr),
                                mesage: "User has been logged in successfully"
                            })
                        }
                        else {
                            res.json({
                                result: null,
                                status: false,
                                mesage: "You account is not active yet, Please contact your admin"
                            })
                        }
                    }
                    else {
                        res.json({
                            result: null,
                            status: true,
                            mesage: "Please check your credentials"
                        })
                    }

                }
                else {
                    res.json({
                        result: null,
                        status: false,
                        mesage: "User Not Found"
                    })
                }
            })
            .catch((error) => {
                res.json({
                    result: error,
                    status: false,
                    message: "Error Occured"
                })
            })
    }
}


module.exports = authController;