const admin = require('../database/model/blogger');

module.exports = function () {
  admin.findOne({ role: 'admin' }, (err, existAdmin) => {
    if (err) {
      return console.log('Somthing went wrong in find exist admin!');
    }

    if (existAdmin) {
      return console.log('Admin already created');
    }

    const ADMIN = new admin({
      firstname: 'admin',
      lastname: 'admin',
      username: 'admin',
      password: 'Admin1372@',
      phone: '09121231212',
      gender: 'male',
      role: 'admin',
      city: 'tehran',
    });

    ADMIN.save((err, admin) => {
      if (err) {
        return console.log(err);
      }

      console.log('Admin created!');
    });
  });
};
