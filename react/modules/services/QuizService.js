import axios from 'axios'
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
    console.log("created", createdByName);
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
    let currentUserId = JSON.parse(localStorage.getItem('currentUserInfo'))._id;
    const requestOptions = {
        'data':data,
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