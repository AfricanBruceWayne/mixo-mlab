'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User = require('../models/User');

const CocktailSchema = new mongoose.Schema({
    name: String,
    description: String,
    recipe: String,
    favouritesCount: { type: Number, default: 0 },
    tagList: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    author: { 
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}, { timestamps: true });

CocktailSchema.plugin(uniqueValidator, { message: 'is already taken' });

CocktailSchema.methods.updateFavouriteCount = () => {
    
    var cocktail = this;

    return User.count({
        favourties: { $in: [cocktail._id] }
    }).then((count) => {
        cocktail.favouritesCount = count;
        return cocktail.save();
    });
};

CocktailSchema.methods.toJSONFor = (user) => {
    return {
        name: this.name,
        description: this.description,
        recipe: this.recipe,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        tagList: this.tagList,
        favorited: user ? user.isFavorite(this._id) : false,
        favoritesCount: this.favoritesCount,
        author: this.author.toProfileJSONFor(user),
        comments: this.comments
    };
};

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;