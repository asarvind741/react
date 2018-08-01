// import error from 'material-ui/svg-icons/alert/error';



const Quiz = require('../models/quiz');
const quizQuestion = require('../models/question')
const User = require('../models/user');
const Result = require('../models/result');
var Mailgun = require('mailgun-js');

var api_key = '8889127d-84a7a4c8';
var domain = 'sandbox5e42adffd0c441b398800e292f657c77.mailgun.org';
var from_who = 'asarvind741@email.com';
var mailgun = new Mailgun({apiKey: api_key, domain: domain,proxy:'http:172.16.1.127:5000'});

let getQuiz = (req, res) => {
  Quiz.findById({_id:req.params.id})
    .then((success) => { 
      res.json(success) 
    })
    .catch((falied) => { res.json(falied) })
}

let getAllQuiz = (req, res) => {
  // if(req.header.token){
  Quiz.find({deleted:false}, (err, quizes) => {

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
  Quiz.find({ categoryname: req.body.categoryName,deleted:false }, { quizname: 1 }, (err, quizes) => {

    if (err)
      res.json(err)
    else {
      res.json(quizes);
    }
  })
}

let getQuizByMe = (req, res) => {
  if (!!req.body.id) {
    Quiz.find({ createdBy: req.boy.id,deleted:false }, (err, quizes) => {
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
  //console.log("req body", req.body);

  let correct_answer = 0;
  let quiz_name = '';
  Quiz.findById(req.body.quizId)
    .then((success) => {
      let questions = success.Questions

      quiz_name = success.quizname;
      /* for (let i = 0; i < req.body.data.length; i++) {
        for (let j = 0; j < questions.length; j++) {

          if (req.body.data[i].questionUniqueId == questions[j]._id) {
            if ((req.body.data[i].selectedAnswer) == (questions[j].correctAnswer)) {
              correct_answer++;
            }
          }
        }
      } */

      req.body.data.forEach(element => {
        console.log("testas", element)
        if(element.selectedAnswer === element.correctAnswer){
          correct_answer++;
        }
      })
      let value = correct_answer*100/req.body.data.length;
      let statusResult;
      if(value>=60){
        statusResult = 'Pass'
      }
      else {
        statusResult = 'Fail'
      }
      
      User.findOneAndUpdate({ _id: req.body.submittedBy }, {
        $push: {
          quizzes: {
            quizId: req.body.quizId,
            quizName: quiz_name,
            totalQuestions: req.body.data.length,
            correctAnswers: correct_answer,
            completedAt: req.body.completedAt,
            question: req.body.data,
            statusResult: statusResult,
            percentage: value
          }
        }
      }, { new: true }, (error, success) => {
        if (error) {
          console.log("error")
          res.status(400).json(error);
        }
        else {
          let result = {};
          success.quizzes.forEach(element => { 

            if(req.body.completedAt == element.completedAt.getTime()) {
              console.log('element.question',element.question)
              result = element;
              var data = {
                //Specify email data
                  from: from_who,
                //The email to contact
                  to: success.email,
                //Subject and text data  
                  subject: 'Test Result',
                  html: `Hello, You have scored ${element.percentage} in ${element.quizName}`
                }
                mailgun.messages().send(data, function (err, body) {
                  console.log("mailgun ==>",err,body)
                  if (err) {
                      console.log("got an error: ", err);
                  }
                  else {
                      console.log(body);
                  }
              });
            

            }            
          });
          console.log(result);
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

let getAllQuizzes = (req,res) => {
  User.aggregate([
    {
      $unwind:'$quizzes'
    },
    {
      $sort:{'quizzes.completedAt': -1}
    }
  ],(error,success) => {
    console.log("=========>",error,success)
    if(error)
    res.status(500).json(error)
    else
    res.status(200).json(success);
  })
}



let getQuizStats = (req,res) => {
  User.findById(req.body.userId)
  .then((success) => {
    let result = {};
    let count = 0;
    success.quizzes.forEach(element => { 

      if(req.body.takenQuizId == element._id) {
        result = element;
        count++
      }            
    });
    console.log(result);
    if(count == 1)
    res.status(200).json(result);
    else 
    res.status(400).json();
  })
  .catch((error) => {
    console.log("error",error)
    res.status(400).json(error);
  })
}

let deleteQuiz = (req,res) => {
  Quiz.findOneAndUpdate({_id:req.body.id},{$set:{deleted:true}},(error,success) => {
    console.log(error,success)
    if(error)
    res.status(500).json(error);
    else
    res.status(200).json(success);
  })
}

let updateQuiz = (req,res) => {
  console.log(req.body);
  Quiz.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true},(error,success) => {
    console.log(error,success)
    if(error)
    res.status(500).json(error);
    else
    res.status(200).json(success);
  })
}










module.exports = {
  getQuizByCategory,
  getQuiz,
  createQuiz,
  getAllQuiz,
  submitQuiz,
  getCategory,
  getQuizByMe,
  getQuizStats,
  getAllQuizzes,
  deleteQuiz,
  updateQuiz
}
