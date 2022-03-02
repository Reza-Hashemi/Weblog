const admin = require('../database/model/blogger'); 

module.exports = function() {
    admin.findOne({role: 'admin'}, (err, existAdmin) => {
        if (err) {
            return console.log('Somthing went wrong in find exist admin!')
        };

        if (existAdmin) {
            return console.log('Admin already created');
        };

        const ADMIN = new admin({
            username: "admin",
            lastName: 'admin',
            firstName: "admin",
            gender:"male",
            password: "12345678",
            role: 'admin'
        });


        ADMIN.save((err, admin) => {
            if (err) {
                return console.log('Somthing went wrong in save admin!')
            };

            console.log("Admin created!");
        })
    })
}