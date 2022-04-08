const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema(
  {
    detail: {
      type: String,
    },
    articleID: {
      type: schema.Types.ObjectId,
      ref: 'article',
      required: true,
    },
    username: {
      type: schema.Types.ObjectId,
      ref: 'blogger',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
