const blogger = require('../database/model/blogger');
const bcrypt = require('bcryptjs');
const signin = (req, res) => {
  res.render('signinPage', { msg: null });
};
const signinProcess = async (req, res) => {
  return res.redirect('/dashboard');
};

module.exports = { signin, signinProcess };
