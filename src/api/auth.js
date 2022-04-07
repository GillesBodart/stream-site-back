const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require('bcryptjs')


router.post('/register', (req, res) => {
    console.log("ici")
    const body = req.body;

    const username = body.username
    const email = body.email
    const password = body.password

    const newUser = new User({name: username, email, password});
    // Hash password before saving in database
    bcrypt.genSalt(14, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    console.log("New user created")
                    res
                        .status(200)
                        .json({user_created: true, user: user})
                        .end();
                })
                .catch(err => {
                    console.log(err)
                    res
                        .status(400)
                        .json({user_created: false, error: err})
                        .end();
                });
        });
    });


});

router.post('/login', (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res.status(400).json({errors: err});
        }
        if (!user) {
            return res.status(400).json({errors: "No user found"});
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({errors: err});
            }
            return res.status(200).json({token: user.id, success: true});
        });
    })(req, res, next);
});


module.exports = router;