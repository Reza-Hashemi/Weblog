async function signout(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = { signout };
