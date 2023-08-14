const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

//Routes
router.get('',  async (req, res) => {
    const locals = {
        title: "Devsawe blog",
        description: "Simple Blog Created with nodeJs, Express & MongoDb."
    }

    try {
        const data = await Post.find();
        res.render('index', { locals, data } );
    } catch (error) {
        console.log(error);

    }

   
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;

