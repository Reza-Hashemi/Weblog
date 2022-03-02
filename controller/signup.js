const blogger = require('../database/model/blogger');

const signup = (req, res) => {
  res.render('signupPage', { msg: null });
};

const signupProcess = (req, res) => {
  const NEW_BLOGGER = new blogger({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    city: req.body.city,
    phone: req.body.phone,
    gender: req.body.gender,
    role: 'blogger',
  });

  NEW_BLOGGER.save((error, user) => {
    if (error) {
      return res.render('signupPage', { msg: error.message });
    }
    res.redirect('/signin');
  });
};

module.exports = { signup, signupProcess };
