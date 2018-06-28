
const Quiz = require('../models/quiz');
const quizQuestion = require('../models/question')

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






let getQuizList = (req, res) => {

    Quiz.find({},{quizname:1}, (err, quizes) => {

        if(err)
        res.json(err)
        else
        res.json(quizes);
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
                res.status(400).json({ error: 'Quiz with this name already exists' })
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




module.exports = {
    getQuizList,
    getQuiz,
    createQuiz,
    getAllQuiz
  }
