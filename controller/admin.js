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

module.exports = { adminPanel, deleteBlogger };
