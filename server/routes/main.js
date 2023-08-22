const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

/**
 * GET - Home
 */
router.get('',  async (req, res) => {
  

    try {
        const locals = {
            title: "Devsawe blog",
            description: "Blog app powered by NodeJS."
        }

        let perPage = 7;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: {createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
        res.render('index', { 
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
         } );

    } catch (error) {
        console.log(error);
    }

});

router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});


/**GET Post: id */
router.get('/post/:id', async (req, res) => {
    try {
        
        let slug = req.params.id;

        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog powered by NodeJs Backend"
        }


        const data = await Post.findById({ _id: slug });
        res.render('post', { 
            locals,
            data,
            currentRoute: `/post/${slug}` 
        });
    } catch (error) {
        console.log(error);
    }
});

/**Post post-searchTerm */
router.post('/search', async (req, res) => {
    try {
        
        const locals = {
            title: "Search",
            description: "Simple Blog powered by NodeJs Backend"
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                {title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                {body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        });

        res.render("search", {
            data,
            locals,
            currentRoute: '/'
        });
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;

