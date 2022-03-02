async function sessionSignin(req, res, next) {
  if (!req.session.user || !req.cookies.blogger_sid) {
    return res.redirect('/signin');
  }
  next();
}

module.exports = sessionSignin;
