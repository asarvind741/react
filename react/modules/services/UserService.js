import axios from 'axios';

export function deleteUser(userData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };
    return dispatch => {
        return fetch('/api/user/delete', requestOptions);
    }
}

// Fake Back-end 
/* export function updateUserNow(userData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };
    return dispatch => {
        return fetch('/api/user/updateUser', requestOptions);
    }
} */

// Nodejs Back-end
export function updateUserNow(userData) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };
    return dispatch => {
        axios.post('/api/user/updateUser', requestOptions);
    }
}
