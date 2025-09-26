const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: { type: String },
  profileImage: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  dob: { type: Date },
  interests: [String],
  googleId: { type: String },
  linkedinId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
