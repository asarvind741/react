import { SUBMIT_QUIZ } from './types';

export function submitQuiz(data){
    return {
        type: SUBMIT_QUIZ,
        data
    }

}