'use strict';

var express = require('express');
var router = express.Router();
var Cocktail = require('../../models/Cocktail');
var User = require('../../models/User');
var auth = require('../auth');

// Preload cocktail objects on routes with ':cocktail'
router.param('cocktail', (req, res, next) => {  
  Cocktail.find()
    .populate('author')
    .then((cocktail) => {
      if (!cocktail) { return res.sendStatus(404); }

      req.cocktail = cocktail;

      return next();
    }).catch(next);
});

// @ route  GET api/cocktails
// @ route  GET All cocktails
// @ access  Public
router.get('/', auth.optional, (req, res, next) => {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then((results) => {
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }

    if(favoriter){
      query._id = {$in: favoriter.favorites};
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
      Cocktail.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Cocktail.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then((results) => {
      var cocktails = results[0];
      var cocktailsCount = results[1];
      var user = results[2];

      return res.json({
        cocktails: cocktails.map((cocktail) => {
          return cocktail.toJSONFor(user);
        }),
        cocktailsCount: cocktailsCount
      });
    });
  }).catch(next);
});



// @ route   POST api/cocktails
// @ desc    Create a cocktail
// @ access  Private
router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (!user) { return res.sendStatus(401); }

    var cocktail = new Cocktail(req.body.cocktail);

    cocktail.author = user;

    return cocktail.save().then(() => {
      console.log(cocktail.author);
      return res.json({cocktail: cocktail.toJSONFor(user)});
    });
  }).catch(next);
});

// @ route  GET api/cocktails/:id
// @ route  GET A cocktail and comments
// @ access  Public
router.get('/:cocktail', auth.optional, (req, res, next) => {
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then((user) => {
    return req.cocktail.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then((cocktail) => {
      return res.json({comments: req.cocktail.comments.map((comment) => {
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});

// @ route   PUT api/cocktails/:id
// @ route   Edit a cocktail
// @ access  Private
router.put('/:cocktail', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if(req.cocktail.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.cocktail.title !== 'undefined'){
        req.cocktail.title = req.body.cocktail.title;
      }

      if(typeof req.body.cocktail.description !== 'undefined'){
        req.cocktail.description = req.body.cocktail.description;
      }

      if(typeof req.body.cocktail.recipe !== 'undefined'){
        req.cocktail.recipe = req.body.cocktail.recipe;
      }

      if(typeof req.body.cocktail.tagList !== 'undefined'){
        req.cocktail.tagList = req.body.cocktail.tagList
      }

      req.cocktail.save().then((cocktail) => {
        return res.json({cocktail: cocktail.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// @ route  DELETE api/cocktails/:id
// @ route  Delete a cocktail
// @ access Private
router.delete('/:cocktail', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (!user) { return res.sendStatus(401); }

    if(req.cocktail.author._id.toString() === req.payload.id.toString()){
      return req.cocktail.remove().then(() => {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

module.exports = router;
