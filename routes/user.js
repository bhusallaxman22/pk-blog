const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../db/users")
const jwt = require("jsonwebtoken")
const keys = require("../config/config")
const auth = require("../config/auth")

// @route POST api/user/register
// @desc Register's a user
// @access Public
router.post("/register", (req, res) => {
    // checks if email is already in use
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json("Email already exists")
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })

                // bcrypt hashes password asynchronously
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err)
                        } else {
                            newUser.password = hash
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        }
                    })
                })
            }
        })
})


// @route POST api/user/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).send("Email not found");
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user._id,
                    name: user.name,
                };
                jwt.sign(
                    payload,
                    keys.secret,
                    {
                        expiresIn: 3600,
                    },
                    (err, token) => {
                        return res.json({
                            token: token,
                            id: user._id,
                            name: user.Name,
                            email: user.email,
                        });
                    }
                );
            } else {
                return res.status(400).send("Password incorrect!");
            }
        });
    });
});

// @route GET api/user/auth
// @desc Return's Token Holder
// @access Private
router.get("/auth", (req, res) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Not Authorised");
    }
    var id = auth(token);
    User.findOne({ _id: id }).then((user) => {
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(401).send("Not Authorised");
        }
    });
});

module.exports = router;