"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    db = require('./models/index');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//Home
app.get('/', function(req, res){
  res.render('home');
});
//Authors all page
app.get('/authors', function(req,res){
  db.Author.findAll().done(function(err,authors){
    res.render('author/index', {authors:authors});
  });
});
//Add new author
app.get('/authors/new', function(req,res){
  res.render('author/new');
});
//Add new author
app.post('/authors',function(req,res){
  db.Author.create({
    name: req.body.author.name
  }).done(function(err,success){
    if(err){
      res.render('author/new');
    }
    else{
      res.redirect('/authors');
    }
  });
});
//Edit author
app.get('/authors/:id/edit', function(req, res) {
  //find our book
  var id = req.params.id;
  db.Author.find(id).done(function(err,author){
    res.render('author/edit', {author: author});
  // }) these next two lines have been replaced by the new version using the package
  // library.findById(id,function(leBook){
  //     res.render('library/edit', {book: leBook});
  });
});
//Update author
app.put('/authors/:id', function(req, res) {
  var id = req.params.id;
  db.Author.find(id).done(function(err,author){
    author.updateAttributes({
      name: req.body.author.name,
     }).done(function(err){
      if(err){
        
        var errMsg = "title must be at least 6 characters long";
        res.render('/edit', {errMsg: errMsg, post: post});

        } else {
        res.redirect('/authors');
        }
     });
  // library.update(id, req.body.book.title, req.body.book.author, function(){
  //   res.redirect('/books');
  });
});

//Delete author
app.delete('/authors/:id', function(req, res) {
  var id = req.params.id;
  db.Author.find(id).done(function(err,author){
    author.destroy().done(function(err){
      res.redirect('/authors');
    });
  // library.destroy(id, function(){ 
  //     res.redirect('/books'); 
  });
});

//Get posts
app.get('/posts', function(req,res){
  db.Post.findAll().done(function(err,posts){
    res.render('post/index', {posts:posts});
  });
});

// New post
app.get('/posts/:id/new', function(req,res){
  var id = req.params.id;
  db.Author.find(id).done(function(err,author){
    res.render('post/new', { author: author });
  });
});

// Create Post
app.post('/posts/:id',function(req,res){
  db.Post.create({
    title: req.body.post.title,
    post: req.body.post.post,
    AuthorId: req.params.id
  }).done(function(err,success){
    if(err){
      res.render('/post/new');
    }
    else{
      res.redirect('/posts');
    }
  });
});


// Edit post
app.get('/posts/:id/edit', function(req,res){
  var id = req.params.id;
  db.Post.find(id).done(function(err,post){
    console.log("Edit post:" + post.AuthorId);
    db.Author.find(post.AuthorId).done(function(err,author){
      res.render('post/edit', { post:post, author:author});
     });
  });
});

// Update Post
app.put('/posts/:id', function(req, res) {
  var id = req.params.id;
  db.Post.find(id).done(function(err,post){
    post.updateAttributes({
      title: req.body.post.title,
      post: req.body.post.post
     }).done(function(err){
      if(err){
        
        var errMsg = "title must be at least 6 characters long";
        res.render('edit', {errMsg: errMsg, post: post});

        } else {
        res.redirect('/authors');
        }
     });
  });
});

//Delete Post
app.delete('/posts/:id', function(req, res) {
  var id = req.params.id;
  db.Post.find(id).done(function(err,post){
    post.destroy().done(function(err){
      res.redirect('/posts');
    });
  // library.destroy(id, function(){ 
  //     res.redirect('/books'); 
  });
});




var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});