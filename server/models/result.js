const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    questionId:{
      type:mongoose.Schema.ObjectId,
      unique:true
  },
  correctAnswer:String,
  selectedAnswer: String
  })

const resultSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    quizId:{
        type: mongoose.Schema.ObjectId,
        ref:'Quiz'
     },

     Answers:[answerSchema]
}, 
 {
    timestamps: true
})

module.exports = mongoose.model('Answers', resultSchema)