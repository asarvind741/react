const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    id:Number,
    quizId:{
       type: mongoose.Schema.ObjectId,
       ref:'Quiz'
    },
    question:{
        type:String,
        unique:true
    },
    
    answerOptions:[String],
    correctAnswer:Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);

