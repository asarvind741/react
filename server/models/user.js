const mongoose = require('mongoose');
//const sha256 = require('sha256');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
const Schema = mongoose.Schema;

/* let hashPassword = (password) =>{
    return sha256(password)
}
 */

const salt = bcrypt.genSaltSync(10);

let hashPassword =(password) => {
   return bcrypt.hashSync(password, salt)
}

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: ` This is not a valid e-mail.`
        }
    },

    password: {
        type: String,
        required: true,
        set: hashPassword
    },

    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },

    company: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);