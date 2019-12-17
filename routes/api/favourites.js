'use strict';

var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var auth = require('../auth');
  
// Favorite an cocktail
router.post('/', auth.required, (req, res, next) => {
    var cocktailId = req.cocktail._id;

    User.findById(req.payload.id).then((user) => {
        if (!user) { return res.sendStatus(401); }

        return user.favorite(cocktailId).then(() => {
        return req.cocktail.updateFavoriteCount().then((cocktail) => {
            return res.json({cocktail: cocktail.toJSONFor(user)});
        });
        });
    }).catch(next);
});
  
// Unfavorite an cocktail
router.delete('/:id', auth.required, (req, res, next) => {
    var cocktailId = req.cocktail._id;

    User.findById(req.payload.id).then((user) => {
        if (!user) { return res.sendStatus(401); }

        return user.unfavorite(cocktailId).then(() => {
        return req.cocktail.updateFavoriteCount().then((cocktail) => {
            return res.json({cocktail: cocktail.toJSONFor(user)});
        });
        });
    }).catch(next);
});

module.exports = router;

