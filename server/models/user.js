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
const questionSchema = new Schema({
    question:{
      type:String,
  },
  
  option1:String,
  option2:String,
  option3:String,
  option4:String,
  correctAnswer:String,
  selectedAnswer:String
  })
const userQuizzes = {
  quizId : {
    type:mongoose.Schema.ObjectId,
    ref:'Quiz'
  },
  quizName:String,
  totalQuestions:Number,
  correctAnswers:Number,
  statusResult:String,
  percentage:Number,
  question: [questionSchema],
  completedAt:{
      type:Date,
}
}
const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: 4,
        default:'Anonymous'
    },

    lastName: {
        type: String,
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
        set: hashPassword
    },

    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },

    company: {
        type: String
    },
    quizzes: [userQuizzes]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
