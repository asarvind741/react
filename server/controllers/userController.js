const User = require('../models/user');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');


let signupUser = (req, res) => {
    if ((!!req.body.email) && (!!req.body.password)) {

        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                res.status(500).json(err);
            }
            else if (!!user) {
                res.status(201).json({ Message: 'User with this e-mail already exists.' ,data:user})
            }
            else {
                User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    company: req.body.company
                }, (err, user) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err);
                    }
                    else {
                        res.json(user);
                    }
                })
            }
        })
    }
    else {
        res.status(401).json({ Error: "Field is missing" });
    }
}

let loginUser = (req, res) => {
    if ((!!req.body.email) && (!!req.body.password)) {

        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                res.status(400).json({ Error: 'Unknown Error occured...' });
            }

            else if (!!user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.status(401).json(err);
                    }
                    else if (result) {
                        console.log("result", result);
                        //res.status(200).json("Successfull");
                        const access_token = jwt.sign({
                            email: user.email,
                            _id: user._id,
                            date: new Date()
                        },
                            config.secret,
                            {
                                expiresIn: '2h'
                            }
                        );
                        res.status(200).json({
                            success: "Welcome",
                            token: `Bearer ${access_token}`,
                            user: user
                        })
                    }
                    else {
                        res.status(401).json({ Message: 'Unauthorize access' })
                    }
                })
            }
            else if(!user){
                res.status(401).json({ Message: 'User does not exist..' })
            }
        })
    }
    else {
        res.status(401).json({ Error: "Field is missing" });
    }

}

let getAllUsers = (req, res) => {
    User.find({}).exec()
        .then((users) => res.json({ Users: users }))
        .catch((error) => res.status(500).json({ error }));
}

let editUser = (req, res) => {

    if (req.body.email) {
        User.findOneAndUpdate({ _id: req.params.userid },
            { $set: req.body },
            { new: true }).then((user) => {
                if (!user) {
                    res.status(400).json({ Error: 'User not found' });
                }
                else if (!!user) {
                    res.json({ Message: `${user.email} has been updated with the provided information.` })
                }
            }, (err) => { res.status(400).json({ Error: err }) })
    }
    else {
        res.status(500).json({ Error: 'Invalid Field' })
    }
}

let deleteUser = (req, res) => {

    if (req.body.email) {
        User.findByIdAndRemove({ _id: req.params.userid }, ).then((user) => {
            if (!user) {
                res.status(400).json({ Error: 'User not found' });
            }
            else if (!!user) {
                res.json({ Message: `${user.email} has been deleted successfully.` })
            }
        }, (err) => { res.status(400).json({ Error: err }) })
    }
    else {
        res.status(500).json({ Error: 'Invalid Field' })
    }
}

let getUserQuizzes = (req, res) => {
    console.log(req.body.id)
    if (!!req.body.id) {
        User.find({ _id: req.body.id }, (err, user) => {
            if (err) {
                res.status(401).json(err);
            }
            else if (!!user && user.length>0) {
                console.log(user);
                let quizzes = user[0].quizzes;
                res.status(200).json(quizzes);
            }
            else {
                res.status(400).json({ Message: "No user found" });
            }
        })
    }
    else {
        res.status(400).json({ Error: "Not valid field" })
    }
}

module.exports = {
    signupUser,
    loginUser,
    getAllUsers,
    editUser,
    deleteUser,
    getUserQuizzes
}