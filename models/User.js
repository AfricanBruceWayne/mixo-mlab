'use strict';

/*
*   Module dependencies.
*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/*
 *  User Schema
 */

const UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "Can't be blank"], trim: true, minlength: 3, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "Can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    bio: String,
    image: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cocktail' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    password: String
}, { timestamps: true });


UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.generateJWT = () => {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = () => {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.toProfileJSONFor = (user) => {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this._id) : false
  };
};

UserSchema.methods.favorite = (id) => {
  if(this.favorites.indexOf(id) === -1){
    this.favorites.push(id);
  }

  return this.save();
};

UserSchema.methods.unfavorite = (id) => {
  this.favorites.remove(id);
  return this.save();
};

UserSchema.methods.isFavorite = (id) => {
  return this.favorites.some((favoriteId) => {
    return favoriteId.toString() === id.toString();
  });
};

UserSchema.methods.follow = (id) => {
  if(this.following.indexOf(id) === -1){
    this.following.push(id);
  }

  return this.save();
};

UserSchema.methods.unfollow = (id) => {
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = (id) => {
  return this.following.some((followId) => {
    return followId.toString() === id.toString();
  });
};

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;



