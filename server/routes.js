const userController = require('./controllers/userController');
const quizController = require('./controllers/quizController');
const jwt = require('jsonwebtoken');

function verifyJWTToken(token)
{
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>
    {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

module.exports =(app) =>{

    //preflight error
    app.options('/api/*', (req, res) => res.status(201).end());

    app.get('/', (req, res) =>{
        res.send('Hello Backend');
    });

    //Register and login routes
    app.post('/api/user/signup', userController.signupUser);
    app.post('/api/user/login', userController.loginUser);


    // Quiz temporary routes
    app.post('/api/quiz/create',  quizController.createQuiz);
    app.get('/api/quiz/get-quiz-list',  quizController.getQuizList);
    app.post('/api/quiz/get-quiz', quizController.getQuiz);
    app.get('/api/quiz/get-all-quiz',quizController.getAllQuiz);

}
