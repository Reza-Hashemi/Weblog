const blogger = require('../database/model/blogger');

async function adminPanel(req, res) {
  const bloggers = await blogger.find({});
  return res.render('adminPanel', { bloggers });
}

async function deleteBlogger(req, res) {
  try {
    const userId = req.params.id;
    await blogger.findByIdAndDelete(userId);
    return res.render('adminPanel');
  } catch (error) {
    return res.render('adminPanel', { msg: 'try again' });
  }
}

// async function updateBlogger(req, res) {

// }

// async function updateBloggerProcess(req, res) {
//   const user = req.session.user._id;
//   const newUpdate = await blogger.findByIdAndUpdate(user, req.body, {
//     new: true,
//   });
//   req.session.user = newUpdate;
// }
