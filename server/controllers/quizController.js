
const Quiz = require('../models/quiz');
const quizQuestion = require('../models/question')
const User = require('../models/user');
const Result = require('../models/result');

let getQuiz = (req, res) => {
  Quiz.findById({_id:req.params.id})
    .then((success) => { 
      res.json(success) 
    })
    .catch((falied) => { res.json(falied) })
}

let getAllQuiz = (req, res) => {
  // if(req.header.token){
  Quiz.find({}, (err, quizes) => {

    if (!!quizes) {

      // let quizList = [];

      // quizes.map((quiz) => {
      //   quizList.push(quiz.quizname);
      // });

      res.json({ status: 200, quizes: quizes })
    }
    else {
      res.json({ Message: 'No quiz found' });
    }

  })
  // }
  // else {
  //   res.status(401).json({Error: 'You are not authenitcated'})
  // }

}






let getQuizByCategory = (req, res) => {
  Quiz.find({ categoryname: req.body.categoryName }, { quizname: 1 }, (err, quizes) => {

    if (err)
      res.json(err)
    else {
      res.json(quizes);
    }
  })
}

let getQuizByMe = (req, res) => {
  if (!!req.body.id) {
    Quiz.find({ createdBy: req.boy.id }, (err, quizes) => {
      if (err) {
        res.status(401).json({ Error: "Error occurred" });
      }
      else if (!!quizes) {
        res.json({ quizes });
      }
      else {
        res.status(400).json({ Error: "You have not created any quiz yet" });
      }
    })
  }
  else {
    res.status(401).json({ Error: "Error occurred" });
  }
}

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
        Quiz.create({
          quizname:req.body.quizname,
          quizcategory: req.body.quizcategory,
          Questions: req.body.questions,
          createdBy:req.body.createdBy,
          createdByName: req.body.createdByName
        }, (err, quiz) => {
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

let submitQuiz = (req, res) => {

  let correct_answer = 0;
  let quiz_name = '';
  Quiz.findById(req.body.quizId)
    .then((success) => {
      let questions = success.Questions

      quiz_name = success.quizname;
      for (let i = 0; i < req.body.data.length; i++) {
        for (let j = 0; j < questions.length; j++) {

          if (req.body.data[i].questionUniqueId == questions[j]._id) {
            if ((req.body.data[i].selectedAnswer) == (questions[j].correctAnswer)) {
              correct_answer++;
            }
          }
        }
      }

      User.findOneAndUpdate({ _id: req.body.submittedBy }, {
        $push: {
          quizzes: {
            quizId: req.body.quizId,
            quizName: quiz_name,
            totalQuestions: req.body.data.length,
            correctAnswers: correct_answer,
            completedAt:req.body.completedAt
          }
        }
      }, { new: false }, (error, success) => {
        if (error) {
          res.status(400).json(error);
        }
        else {
          let result;
          success.quizzes.forEach(element => { 
            if(req.body.quizId == element.quizId){
              let value = element.correctAnswers*100/element.totalQuestions;
              let statusResult;
              if(value>=60){
                statusResult = 'Pass'
              }
              else {
                statusResult = 'Fail'
              }
              result = `{"percentage": "${value}", 
              "quizname":"${element.quizName}", 
              "statusResult": "${statusResult}"}`
            }            
          });
          res.status(200).json(result);
        }
      })



    })
    .catch((failed) => {
      res.status(400).json(failed)
    })
}

let getCategory = (req, res) => {
  Quiz.find({}, { categoryname: 1 }, (err, quizes) => {

    if (!!quizes) {

      res.json({ status: 200, quizes: quizes })
    }
    else {
      res.json({ Message: 'No quiz found' });
    }
  })
}








module.exports = {
  getQuizByCategory,
  getQuiz,
  createQuiz,
  getAllQuiz,
  submitQuiz,
  getCategory,
  getQuizByMe
}
