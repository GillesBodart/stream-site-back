const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
        User.findOne({email: email})
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, isMatched) => {
                        if (err) throw err
                        if (isMatched) return done(null, user)
                        else return done(null, false, {message: "Wrong password"})
                    })
                } else {
                    return done(null, false, {message: "User not found"})
                }
            })
            .catch(err => {
                return done(null, false, {message: err})
            })
    }
))


module.exports = passport