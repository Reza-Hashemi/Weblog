const blogger = require('../database/model/blogger');

async function dashboardRender(req, res) {
  const user = req.session.user;
  res.render('dashboardPage', { user, msg: null });
}

async function dashboardUpdate(req, res) {
  try {
   
    const updated = await blogger.findByIdAndUpdate(
      req.session.user._id,
      req.body,
      {
        new: true,
      }
    );
    req.session.user = updated;
    const user = req.session.user;
    return res.render('dashboardPage', { user, msg: null });
  } catch (error) {
    res.status(400).send('somthing Wrong');
  }
}

async function dashboardRemove(req, res) {
  const user = req.params.id;
  
  await blogger.findByIdAndDelete(user);
  res.redirect('/signout');
}

module.exports = { dashboardRender, dashboardUpdate, dashboardRemove };
