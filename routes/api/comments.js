'use strict';

var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var Comment = require('../../models/Comment');
var auth = require('../auth');
  
router.param('comment', (req, res, next, id) => {
Comment.findById(id).then((comment) => {
    if(!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
}).catch(next);
});

// create a new comment
router.post('/', auth.required, (req, res, next) => {
    User.findById(req.payload.id).then((user) => {
        if(!user){ return res.sendStatus(401); }

        var comment = new Comment(req.body.comment);
        comment.cocktail = req.cocktail;
        comment.author = user;

        return comment.save().then(() => {
        req.cocktail.comments.push(comment);

        return req.cocktail.save().then((cocktail) => {
            res.json({comment: comment.toJSONFor(user)});
        });
        });
    }).catch(next);
});
  
router.delete('/:comment', auth.required, (req, res, next) => {
    if(req.comment.author.toString() === req.payload.id.toString()){
        req.cocktail.comments.remove(req.comment._id);
        req.cocktail.save()
        .then(Comment.find({_id: req.comment._id}).remove().exec())
        .then(() => {
            res.sendStatus(204);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
  