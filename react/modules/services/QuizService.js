import axios from 'axios'

export function submitQuiz(data) {
    console.log("quiz data", data);
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

export function getSelectedQuiz(quizId) {
  const token = localStorage.getItem('token')
  const requestOptions = {

    'quizId' : quizId
  };
  return dispatch => {
      return axios.post('http://localhost:5000/api/quiz/get-quiz',requestOptions);
  }
}
