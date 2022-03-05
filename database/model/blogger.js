const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const schema = mongoose.Schema;

const bloggerSchema = new schema(
  {
    firstname: {
      type: String,
      required: [true, 'firstname is required'],
      minlength: [3, 'invalid firstname'],
      maxlength: [20, 'invalid fistname'],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, 'lastname is required'],
      minlength: [3, 'invalid lastname'],
      maxlength: [20, 'invalid lastname'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      minlength: [3, 'invalid username'],
      maxlength: [20, 'invalid username'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [8, 'invalid password'],
      maxlength: [80, 'invalid password'],
      validate: {
        validator: function (v) {
          const reg = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
          );
          return reg.test(v);
        },
        message: 'password must be complex',
      },
    },
    city: {
      type: String,
      required: [true, 'city is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          const reg = new RegExp(
            '^(\\+98|0)?9\\d{9}$'
          );
          return reg.test(v);
        },
        message: 'phone is not acceptable',
      },
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: ['male', 'female', 'other'],
      default: 'male',
    },
    role: {
      type: String,
      enum: ['admin', 'blogger'],
      default: 'blogger',
    },
    avatar: {
      type: String,
      default : "defaultImage.png" 
    }
  },
  { timestamps: true }
);

bloggerSchema.pre('save', async function (next) {
  const user = this._doc;
  if (this.isNew || this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } else {
    next();
  }
});


module.exports = mongoose.model('blogger', bloggerSchema);
