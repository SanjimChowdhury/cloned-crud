const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: false, unique: false },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    // Add any other fields you need for your user model
});

// Password hash middleware.

UserSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err) }
            user.password = hash
            next()
        })
    })
})

// Helper method for validating user's password.


UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    });
  };


const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
