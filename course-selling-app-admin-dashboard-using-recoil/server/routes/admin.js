const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Admin, Course } = require("../db");
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({username: req.user.username});
    if(!admin){
        res.status(403).json({message: "Admin doesn't exists"});
        return
    }
    res.json({
        username: req.user.username
    })
})

router.post("/signup", (req, res) => {
    const {username, password} = req.body;

    function callback1(admin){
        if(admin){
            console.log(admin);
            return res.status(403).json({message: 'Admin already exists'});
        } else{
            const obj = {username: username, password: password};
            const newAdmin = new Admin(obj);
            newAdmin.save();
            
            const token = jwt.sign({username, role: 'admin'}, SECRET, { expiresIn: '1h' });
            res.status(200).json({message: 'Admin created successfully', token});
        }
    }

    Admin.findOne({username}).then(callback1);
})

router.post("/login", async (req, res) => {
    const {username, password} = req.headers;
    const admin = await Admin.findOne({username, password});
    if(admin){
        console.log(admin);
        const token = jwt.sign({username, role: 'admin'}, SECRET, { expiresIn: '1h' });

        res.json({message: 'Logged in successfully', token});
    } else{
        res.status(403).json({message: 'Invalid username or password'});
    }
});

router.post("/courses", authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    //console.log(course._id);
    const admin = await Admin.findOne({username: req.user.username});
    if(admin) {
        admin.createdCourses.push(course);
        await admin.save();
        //console.log(admin);
    } else{
        res.status(403).json({ message: 'Admin not found' });
    }

    res.json({ message: 'Course created successfully', courseId: course.id });
})

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
    if(course){
        res.json({message: 'Course updated successfully'});
    } else{
        res.status(404).json({ message: 'Course not found' });
    }
});

router.get("/courses/", authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({courses});
})

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    res.json({ course });
})

router.delete("/deletecourse/:courseId", authenticateJwt, async(req, res) => {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    console.log(Course);
    if(course) {
        const admin = await Admin.findOne({username: req.user.username});
        if(admin){
            const adminCourseIds = admin.createdCourses;
            const index = adminCourseIds.indexOf(req.params.courseId);
            if(index > -1){
                admin.createdCourses.splice(index, 1);
                await admin.save();
            }
        } else{
            res.status(403).json({ message: 'Admin not found' });
        }
        // const user = await User.findOne({username: req.user.username});
        // if(user){
        //     const userCourseIds = user.purchasedCourses;
        //     const index = userCourseIds.indexOf(req.params.courseId);
        //     if(index > -1){
        //         user.purchasedCourses.splice(index, 1);
        //         await user.save();
        //     }
        // } else{
        //     res.status(403).json({ message: 'User not found' });
        // }
        res.json({message: 'Course deleted!!'})
    } else{
        res.status(404).json({ message: 'Course not found' });
    }
})

router.get('/createdCourses', authenticateJwt, async(req, res) => {
    const admin = await Admin.findOne({username: req.user.username});

    if(admin) {
        res.json({createdCourses: admin.createdCourses || []});
    } else {
        res.status(403).json({ message: 'Admin not found' });
    }
})

module.exports = router;