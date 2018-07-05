
const Quiz = require('../models/quiz');
const quizQuestion = require('../models/question')
const User = require('../models/user');

let getQuiz = (req, res) => {
  console.log(req.body)
  Quiz.findById(req.body.quizId)
  .then((success)=> { res.json(success)})
  .catch((falied) => { res.json(falied)})
}

let getAllQuiz = (req, res) => {
  // if(req.header.token){
    Quiz.find({}, (err, quizes) => {

      if(!!quizes){

      // let quizList = [];

      // quizes.map((quiz) => {
      //   quizList.push(quiz.quizname);
      // });

      res.json({ status:200, quizes:quizes})
    }
    else {
      res.json({Message:'No quiz found'});
    }

    })
  // }
  // else {
  //   res.status(401).json({Error: 'You are not authenitcated'})
  // }

}






let getQuizByCategory = (req, res) => {
    console.log(req.body.categoryName)
    Quiz.find({categoryname:req.body.categoryName},{quizname:1}, (err, quizes) => {

        if(err)
        res.json(err)
        else {
        console.log(quizes);
        res.json(quizes);
        }
    })
}

// let getQuiz = (req, res) => {

//   Quiz.findById(req.body.id, (err, quiz) => {

//     if(err)
//     res.json(err)
//     else
//     res.json(quiz);
// })
// }

let createQuiz = (req, res) => {
    if (!!req.body.quizname) {
        Quiz.findOne({ quizname: req.body.quizname }, (err, quiz) => {
            if (err) {
                res.status(500).json(err);
            }
            else if (!!quiz) {
                res.status(500).json({ Message: 'Quiz with this name already exists' })
            }
            else {
                Quiz.create(req.body, (err, quiz) => {
                    if (err) {

                        res.status(500).json(err);
                    }
                    else {
                        res.json({ quiz })
                    }
                })
            }
        })
    }
    else {
        res.status(400).json({ error: "Invalid Field" })
    }
}

let submitQuiz = (req,res) => {
  let correct_answer=0;
  let quiz_name='';
  console.log(req.body)
    Quiz.findById(req.body.quizId)
    .then((success) => {
      // console.log(success)
      let questions = success.Questions
      quiz_name = success.quizname;
      console.log(req.body.questions)
      for(let i=0;i<req.body.questions.length;i++) {
        console.log('req.body.questions[i]',req.body.questions[i]);
        for(let j=0;j<questions.length;j++) {
          console.log('questions[j]',questions[j])
          if(req.body.questions[i]._id==questions[j]._id) {
            console.log("question matched",req.body.questions[i].value,"**",questions[j].correct_answer)
            if(parseInt(req.body.questions[i].value)==parseInt(questions[j].correct_answer))
            {
              console.log("answer matched")
              correct_answer++;
              console.log(correct_answer)
            }
          }
        }
      }

      User.findOneAndUpdate({_id:req.body.userId},{$set:{quizzes:{
        quizId:req.body.quizId,
        quizName:quiz_name,
        totalQuestions:req.body.questions.length,
        correctAnswers:correct_answer
      }}},{new:true},(error,success) => {
        if(error)
        {
          console.log(error)
          res.status(400).json(error);
        }
        else {
          console.log(success);
          res.status(200).json(success.quizzes);
        }
      })



    })
    .catch((failed) => {
      res.status(400).json(failed)
      console.log(failed)
    })
}

let getCategory = (req,res) => {
  Quiz.find({},{categoryname:1}, (err, quizes) => {

    if(!!quizes){

    res.json({ status:200, quizes:quizes})
  }
  else {
    res.json({Message:'No quiz found'});
  }
})
}






module.exports = {
    getQuizByCategory,
    getQuiz,
    createQuiz,
    getAllQuiz,
    submitQuiz,
    getCategory
  }
