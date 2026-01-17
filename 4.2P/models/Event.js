// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: String },       // keep as string for display simplicity here
  location: { type: String },
  image: { type: String },      // path relative to /public
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
