const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

let user = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    userName: { type:String, unique: '{userName} is already taken' },
    password: { type:String, unique: '{password} is already taken' },
    admin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

user.add({ myId: { type: ObjectId, ref: 'Users' }, address: String })

let farmers = new Schema({
    firstName: String,
    lastName: String,
    mobile: Number,
    farmerId: { type: ObjectId, ref: 'Farmer' }
})

const userSchema = mongoose.model('Users', user);
const farmerSchema = mongoose.model('Farmers', farmers)

module.exports = { userSchema: userSchema, farmerSchema: farmerSchema };