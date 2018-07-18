import axios from 'axios'
import moment from 'moment';
export const SUBMIT_QUIZ_REQUEST = 'SUBMIT_QUIZ_REQUEST';

/* export function submitQuiz(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return dispatch => {
        return fetch('/api/user/quiz/submit', requestOptions);
    }
} */


export function submitQuiz(data) {
    let userInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
    let currentUserId = userInfo._id;
    let createdByName = `${userInfo.firstName} ${userInfo.lastName}`;
    const requestOptions = {
        'quizname':data.quizName,
        'questions':data.questions,
        'quizcategory':data.quizCategory,
        'createdBy':currentUserId,
        'createdByName': createdByName
    };

    return dispatch => {
        return axios.post('http://localhost:5000/api/quiz/create', requestOptions);
    }
}

export function getAllQuizList() {
  const token = localStorage.getItem('token')
  const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
           'token': token
      },
  };
  return dispatch => {
      return axios.get('http://localhost:5000/api/quiz/get-all-quiz',requestOptions);
  }
}

/* export function getSelectedQuiz(quizId) {
  const token = localStorage.getItem('token')
  const requestOptions = {

    'quizId' : quizId
  };
  return dispatch => {
      return axios.post('http://localhost:5000/api/quiz/get-quiz',requestOptions);
  }
}
 */

 export function getSelectedQuiz(id){

    return dispatch => {
        return axios.post(`http://localhost:5000/api/quiz/get-quiz/${id}`);
    }
 }

 export function completeQuiz(data, id, date) {
     console.log('data is--------', data);
     let currentUserId ;
     if(localStorage.getItem('guestUser'))
     currentUserId = localStorage.getItem('guestUser');
     else 
     currentUserId = JSON.parse(localStorage.getItem('currentUserInfo'))._id;
     let data2 = [];
     data.forEach(element => {
        let data1 = {};
        console.log("element is", element)
        data1.question = element.question.question;
        data1.option1 = element.question.option1,
        data1.option2 = element.question.option2,
        data1.option3 = element.question.option3,
        data.option4 = element.question.option4,
        data1.correctAnswer = element.question.correctAnswer,
        data1.selectedAnswer = element.selectedAnswer 
        data2.push(data1);
    });


    const requestOptions = {
        'data':data2,
        'quizId': id,
        'submittedBy':currentUserId,
        'completedAt': date
    };

    return dispatch => {
        return axios.post('http://localhost:5000/api/quiz/submit-quiz', requestOptions);
    }
}

export function getUserQuiz(id) {
    
    const requestOptions = {
        'id': id
    };

    return dispatch => {
        return axios.post('http://localhost:5000/api/user/get-user-quizzes', requestOptions);
    }
}

export function getTakenQuiz(data) {
    const requestOptions = {
        userId: data.userId,
        takenQuizId: data.takenQuizId
    }
    return dispatch => {
        return axios.post('http://localhost:5000/api/quiz/get-taken-quiz', requestOptions);
    }

}