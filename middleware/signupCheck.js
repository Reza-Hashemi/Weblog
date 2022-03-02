const blogger = require('../database/model/blogger');

async function signupCheck(req, res, next) {
  const { firstname, lastname, username, password, city, phone, gender } =
    req.body;
  if (
    !firstname?.trim() ||
    !lastname?.trim() ||
    !username?.trim() ||
    !password ||
    !city?.trim() ||
    !phone?.trim() ||
    !gender?.trim()
  ) {
    return res.render('signupPage', { msg: 'enter all inputs' });
  }

  if (username.length < 3) {
    return res.render('signupPage', {
      msg: 'username must be at least 3 character',
    });
  }
  if (password.length < 8 || password.length > 80) {
    return res.render('signupPage', {
      msg: 'password is not acceptable',
    });
  }
  if (await blogger.findOne({ username: username.trim() })) {
    return res.render('signupPage', { msg: 'username already exist' });
  }
  if (await blogger.findOne({ phone: phone.trim() })) {
    return res.render('signupPage', { msg: 'phone is not acceptable' });
  }
  next();
}

module.exports = signupCheck;
