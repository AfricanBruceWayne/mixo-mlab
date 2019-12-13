'use strict';

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    body: String,
    createdAt: { type: Date, default: Date.now() },
    author: { 
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },
        username: String
    },
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