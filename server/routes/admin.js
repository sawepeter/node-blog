const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminLayout = '../views/layouts/admin';

/** get admin login page */
router.get('/admin', async (req, res) => {

    try {
        const locals = {
            title: "Admin",
            description: "Simple blog web app powered by NodeJS"
        }

        res.render('admin/index', { locals, layout: adminLayout });
        
    } catch (error) {
        console.log(error);
    }
});
/**Admin Check Login */
router.post('/admin', async (req, res) => {
    try {

        const { username, password } = req.body;
        console.log(req.body);
        res.redirect('/admin');
        
    } catch (error) {
        console.log(error)
    }
});

/**Admin - Register */
router.post('/register', async (req, res) => {
    try {

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword});
            res.status(201).json({ message: 'User created', user });
            
        } catch (error) {
            if( error.code === 11000) {
                res.status(409).json({ message: 'User already in use'});
            }
            res.status(500).json({ message: 'Internal server error'});
            
        }
        
        
    } catch (error) {
        console.log(error)
    }
});
module.exports = router;