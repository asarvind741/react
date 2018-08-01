const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const questionSchema = new Schema({
  question:{
    type:String,
    unique:true
},

option1:String,
option2:String,
option3:String,
option4:String,
correctAnswer:String
})
const quizSchema = new Schema({
    quizcategory:{
      type: String
    },
    quizname: {
        type: String,
        unique:true,
        required: true,
        trim: true
    },
    Questions:[questionSchema],
    createdBy:{
      type:mongoose.Schema.ObjectId,
      ref:'User'
    },
    createdByName: {
        type: String,
        trim: true
    },
    deleted:{
        type:Boolean,
        default:false
    }

}
, {
    timestamps: true
})

module.exports = mongoose.model('Quiz', quizSchema)
