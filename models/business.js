const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let business = new Schema({
    personName: { type: String },
    businessName: { type: String },
    businessGSTNo: { type: Number, required: '{businessGSTNo} is already exists' }
}, { collection: 'business' });

module.exports = mongoose.model('Business', business);