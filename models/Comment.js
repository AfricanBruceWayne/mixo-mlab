const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cocktail: { type: mongoose.Schema.Types.ObjectId, ref: 'Cocktail' }
}, { timestamps: true });

// Requires population of cocktail
CommentSchema.methods.toJSONFor = (user) => {
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        author: this.author.toProfileJSONFor(user)
    };
};

module.exports = mongoose.model('Comment', CommentSchema);