const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/xxx', function (error) {
  if (error) {
    console.log(error);
    process.exit(0);
  }
});

mongoose.connection.on('connected', () => console.log('connected to database'));
