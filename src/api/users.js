const express = require("express");
const passport = require('passport');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();


router.get('/me', (req, res) => {
        const token = getId(req.headers);
        if (token) {
            User.findById(token)
                .then(user => {
                    if (user) {
                        res
                            .status(200)
                            .json(user)
                            .end();
                    } else {
                        res.status(403).send({success: false, msg: 'Unauthorized.'})
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(403).send({success: false, msg: 'Unauthorized.'})
                })
        } else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    }
)

getId = function (headers) {
    console.log(headers);
    if (headers && headers.authorization) {
        return headers.authorization
    }
    return -1

};

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


module.exports = router;