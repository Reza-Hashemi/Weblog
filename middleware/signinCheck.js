const blogger = require('../database/model/blogger');
const bcrypt = require('bcryptjs');

async function signinCheck(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json('enter username and password');
    }
    const user = await blogger.findOne({ username: req.body.username });
    if (!user) {
      return res.status(403).json('username or password is wrong');
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(403).json('username or password is wrong');
    }
    req.session.user = user;
  } catch (error) {
    return res.status(500).json(error.message);
  }

  next();
}

module.exports = signinCheck;
