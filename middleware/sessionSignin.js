async function sessionSignin(req, res, next) {
  if (!req.session.user || !req.cookies.blogger_sid) {
    return res.redirect('/signin');
  }
  next();
}

async function bloggerAccess(req,res,next){
  if(req.session.user.role !== "blogger"){
    return res.status(400).json("access denied")
  }
  next()
}

module.exports = {sessionSignin, bloggerAccess};
