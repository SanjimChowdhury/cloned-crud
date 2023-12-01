const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new Schema({
    name: String,
    quote: String,
    loveCount: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Character', characterSchema, 'quotes')