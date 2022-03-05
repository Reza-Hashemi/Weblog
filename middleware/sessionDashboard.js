async function sessionDashboard(req, res, next) {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  next();
}
module.exports = {sessionDashboard};
