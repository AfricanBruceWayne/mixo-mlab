var express = require('express');
var router = express.Router();

const Cocktail = require('../../models/Cocktail');

// return a list of tags
router.get('/tags', (req, res, next) => {
    Cocktail.find().distinct('tagList').then((tags) => {
        return res.json({ tags: tags });
    }).catch(next);
});

module.exports = router;