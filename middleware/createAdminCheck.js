const blogger = require('../database/model/blogger');
async function createAdminCheck(req, res, next) {
  try {
    const {
      firstname,
      lastname,
      username,
      password,
      city,
      phone,
      gender,
      role,
    } = req.body;
    if (
      !firstname?.trim() ||
      !lastname?.trim() ||
      !username?.trim() ||
      !password ||
      !city?.trim() ||
      !phone?.trim() ||
      !gender?.trim() ||
      !role?.trim()
    ) {
      return res.status(400).json('enter all inputs');
    }
    if (username.length < 3) {
      return res.status(400).json("'username must be at least 3 character");
    }

    if (password.length < 8 || password.length > 80) {
      return res.status(400).json('password is not acceptable');
    }
    if (await blogger.findOne({ username: username.trim() })) {
      return res.status(400).json('username already exist');
    }
    if (await blogger.findOne({ phone: phone.trim() })) {
      return res.status(400).json('phone is not acceptable');
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
  next();
}

module.exports = {createAdminCheck}
