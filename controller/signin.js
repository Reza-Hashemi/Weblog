const blogger = require('../database/model/blogger');
const bcrypt = require('bcryptjs');
const signin = (req, res) => {
  
  res.render('signinPage', { msg: null });
};
const signinProcess = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('signinPage', { msg: 'enter username and password' });
  }
  try {
    const user = await blogger.findOne({ username: req.body.username });
    if (!user) {
      return res.render('signinPage', { msg: 'username or password is wrong' });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.render('signinPage', { msg: 'username or password is wrong' });
    }
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signin, signinProcess };
