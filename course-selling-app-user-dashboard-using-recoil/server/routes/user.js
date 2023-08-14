const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {User, Admin, Course} = require('../db');
const { SECRET } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

// router.get("/me", authenticateJwt, async(req, res) => {
//     const user = await User.findOne({username: req.user.username});

//     if(!user) {
//         res.status(401).json({message: "User not found!"});
//         return;
//     }
//     res.json({
//         username: req.user.username
//     });

// })

router.get("/me", authenticateJwt, async (req, res) => {
    const user = await User.findOne({username: req.user.username});
    if(!user){
        res.status(403).json({message: "User doesn't exists"});
        return;
    }
    res.json({
        username: req.user.username
    })
})


router.post("/signup", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(user){
        res.status(403).json({ message: 'User already exists' });
    } else{
        const newUser = new User({username, password});
        await newUser.save();
        const token = jwt.sign({username, role: 'user'}, SECRET, {expiresIn: '1h'});
        res.json({message: 'User created successfully', token});
    }
});

router.post("/login", async (req, res) => {
    const {username, password} = req.headers;
    const user = await User.findOne({username, password});
    if(user){
        const token = jwt.sign({username, role: 'user'}, SECRET, {expiresIn: '1h'});
        res.json({message: 'Logged in successfully', token});
    } else{
        res.status(403).json({message: 'Invalid username or password'});
    }
});

router.get("/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({courses});
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
    const course_id = req.params.courseId;
    const course = await Course.findById(req.params.courseId);
    if(course){
        const user = await User.findOne({username: req.user.username});
        if(user){
            const user_course = user.purchasedCourses.find(id => id == course_id);
            console.log(user_course);
            if(user_course){
                res.status(403).json({ message: 'You have already enrolled in this course!' });
                return;
            }
            user.purchasedCourses.push(course);
            await user.save();
            res.json({ message: 'Course purchased successfully' });
        } else{
            res.status(403).json({ message: 'User not found' });
        }
    } else{
        res.status(404).json({ message: 'Course not found' });
    }
});

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);

    if(course) {
        res.json({course});
    } else {
        res.status(403).json({message: 'Course not found'});
    }
})

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username});
    if(user){
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
})

module.exports = router;