'use strict';

var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var auth = require('../auth');
var Cocktail = require('../../models/Cocktail');

router.get('/feed', auth.required, (req, res, next) => {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then((user) => {
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Cocktail.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      Cocktail.count({ author: {$in: user.following}})
    ]).then((results) => {
      var cocktails = results[0];
      var cocktailsCount = results[1];

      return res.json({
        cocktails: cocktails.map((cocktail) => {
          return cocktail.toJSONFor(user);
        }),
        cocktailsCount: cocktailsCount
      });
    }).catch(next);
  });
});

module.exports = router;