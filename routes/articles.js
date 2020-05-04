let express = require('express');
let route = express.Router();
let Articles = require('../models/articles');

// Creating article form.
route.get('/new', (req,res,next) => {
    res.render('articleForm');
})

// Posting an article.
route.post('/', (req,res, next) => {
    Articles.create(req.body, (err,article) => {
        if (err) return next(err)
        res.render('articles', {article});
    })
})

// Getting list of all articles.
route.get('/home', (req,res,next) => {
    Articles.find({}, (err, articles) => {
        if(err) return next(err);
        res.render('home', {articles});
    })
})

// Getting a single user.
route.get('/:id', (req,res,next) => {
    let id = req.body.id;
    Articles.findOne(id, (err,article) => {
        if(err) return next(err);
        res.render('articles', {article});
    })
})

// Updating article.
route.get('/:id/edit', (req,res,next) => {
    Articles.findById(req.params.id, (err,data) => {
        res.render('update', { data });
    })
})

route.post('/:id', (req,res) => {
    Articles.findByIdAndUpdate(req.params.id, req.body, (err,update) => {
        if (err) return next(err);
        res.redirect('/articles/home');
    })
})

// Likes
route.get('/:id/like', (req,res,next) => {
    let id = req.params.id;
    Articles.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err,article) => {
        if(err) return next(err);
        res.redirect(`/articles/${id}`);
    })
})

// Deleting articles.
route.get('/:id/delete', (req,res) => {
    Articles.findByIdAndDelete(req.params.id, (err,user) => {
        if(err) return (err);
        res.redirect('/articles/home');
    })
})

module.exports = route;