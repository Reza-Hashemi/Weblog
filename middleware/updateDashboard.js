const blogger = require('../database/model/blogger');

async function updateDashboard(req, res, next) {
  const user = req.session.user;
  const existUser = await blogger.findOne({ username: req.body.username });

  const { firstname, lastname, username, city, phone, gender } = req.body;
  if (
    !firstname?.trim() ||
    !lastname?.trim() ||
    !username?.trim() ||
    !city?.trim() ||
    !phone?.trim() ||
    !gender?.trim()
  ) {
    return res.render('dashboardPage', { user, msg: 'Filled All Inputs' });
  }
  if (username.length < 3) {
    return res.render('dashboardPage', {
      user,
      msg: 'username is not accepted',
    });
  }

  if (
    (await blogger.findOne({ username: username })) &&
    req.session.user.username !== username
  ) {
    return res.render('dashboardPage', { user, msg: 'username is not accepted'});
  }
  if (
    (await blogger.findOne({ phone: phone })) &&
    req.session.user.phone !== phone
  ) {
    return res.render('dashboardPage', { user, msg: 'phone is not accepted' });
  }

  next();
}

module.exports = updateDashboard;
