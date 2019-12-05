module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SESSION_SECRET : 'secret'
};
  

