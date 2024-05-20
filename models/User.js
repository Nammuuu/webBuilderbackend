// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plan: { type: String, required: true },
  role: { type: String, default: 'viewer' } // roles: admin, editor, viewer
});

module.exports = mongoose.model('User', UserSchema);
