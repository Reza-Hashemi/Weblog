const signin = (req, res) => {
  res.render('signinPage', { msg: null });
};
const signinProcess = async (req, res) => {
  if (req.session.user.role === 'admin') {
    return res.redirect('/admin');
  } else {
    return res.redirect('/dashboard');
  }
  
};

module.exports = { signin, signinProcess };
