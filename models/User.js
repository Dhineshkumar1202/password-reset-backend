const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  resetPasswordToken: {
    type: String,
  },

});

module.exports = mongoose.model('User', UserSchema);
