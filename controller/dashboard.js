const blogger = require('../database/model/blogger');
const bcrypt = require('bcryptjs');
async function dashboardRender(req, res) {
  const user = req.session.user;
  res.status(200).json(user);
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
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).send('somthing Wrong');
  }
}

async function dashboardRemove(req, res) {
  await blogger.findByIdAndDelete(req.params.id);
  res.redirect('/signout');
}

async function resetPassword(req, res) {
  return res.status(200).json('ok');
}
async function resetPasswordProcess(req, res) {
  try {
    const newPassword = req.body.newpassword;
    const hash = bcrypt.hashSync(newPassword, 10);
    console.log(hash);
    console.log(req.body.newpassword);
    await blogger.findByIdAndUpdate(req.session.user._id, {
      password: hash,
    });
    return res.status(200).redirect('/dashboard');
  } catch (error) {
    return res.status(500).json('somthing worng');
  }
}

module.exports = {
  dashboardRender,
  dashboardUpdate,
  dashboardRemove,
  resetPassword,
  resetPasswordProcess,
};
