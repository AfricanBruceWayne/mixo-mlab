const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User = mongoose.model('User');

const CocktailSchema = new mongoose.Schema({
    name: String,
    description: String,
    recipe: String,
    favouritesCount: { type: Number, default: 0 },
    tagList: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

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
        author: this.author.toProfileJSONFor(user)
    };
};

module.exports = Cocktail = mongoose.model('Cocktail', CocktailSchema);