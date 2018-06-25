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
correct_answer:Number
})
const quizSchema = new Schema({
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
    }

}
, {
    timestamps: true
})

module.exports = mongoose.model('Quiz', quizSchema)
