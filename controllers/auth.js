const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')


exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/quotes')
    }
    res.render('login', {
        title: 'Login'
    })
}

exports.postLogin = async (req, res, next) => {
    try {
        const validationErrors = [];
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
        if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });

        if (validationErrors.length) {
            req.flash('errors', validationErrors);
            return res.redirect('/login');
        }

        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

        const authenticateAsync = (req, res, next) => {
            return new Promise((resolve, reject) => {
                passport.authenticate('local', (err, user, info) => {
                    if (err) { return reject(err); }
                    if (!user) {
                        //req.flash('errors', info);
                        return reject(info);
                    }
                    req.logIn(user, (err) => {
                        if (err) { return reject(err); }
                        //req.flash('success', { msg: 'Success! You are logged in.' });
                        console.log('Success! You are logged in.')
                        resolve(user);
                    });
                })(req, res, next);
            });
        };

        await authenticateAsync(req, res, next);
        res.redirect(req.session.returnTo || '/quotes');
    } catch (err) {
        return next(err);
    }
};


exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect('/quotes')
    }
    res.render('signup', {
        title: 'Create Account'
    })
}

exports.postSignup = async (req, res, next) => {
    try {
      const validationErrors = [];
      if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
      if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
      if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });
  
      if (validationErrors.length) {
        //req.flash('errors', validationErrors);
        return res.redirect('../signup');
      }
  
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  
      const existingUser = await User.findOne({
        $or: [
          { email: req.body.email },
          { userName: req.body.userName }
        ]
      });
  
      if (existingUser) {
        //req.flash('errors', 'Account with that email address or username already exists.');
        return res.redirect('../signup');
      }
  
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      });
  
      await user.save();
  
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/quotes');
      });
    } catch (err) {
      return next(err);
    }
  };
  /* exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/quotes')
        })
      })
    })
  } */