const mongoose = require('mongoose');
const schema = mongoose.Schema;

const articleSchema = new schema(
  {
    title: {
      type: String,
      minlength: [3, 'title must be more than 3 characters'],
      maxlength: [30, 'title must be les than 30 characters'],
      required: true,
    },
    context: {
      type: String,
      required: true,
      minlength: [5, 'context must be more than 3 characters'],
      maxlength: [300, 'context must be less than 300 characters'],
    },
    picture: {
      type: String,
      required: true,
    },
    visited: {
      type: Number,
    },
    author: {
      type: schema.Types.ObjectId,
      ref: 'blogger',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('article', articleSchema);
