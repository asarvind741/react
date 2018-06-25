
const mongoose = require('mongoose')
const sha256 = require('sha256')
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    token:{
        type: String
    }
})

sessionSchema.pre('save', function(next){
    this.token = sha256(this.userId + Date.now());
    next();
})

module.exports = mongoose.model('Session', sessionSchema);