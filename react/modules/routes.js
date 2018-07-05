import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ForgotPassword from './components/password-reset/ForgotPassword';
import Users from './components/users/Users';
import Company from './components/company/Company';
import Settings from './components/settings/Settings';
import Logout from './components/logout/Logout';
import Main from './components/quiz/Main'
import QuizSettings from './components/QuizSettings/QuizSettings'
import MainJavascript from './components/javscript-quiz/MainJavascript';
import CreateQuiz from './components/createQuiz/createQuiz';
import ListQuiz from './components/listQuiz/listQuiz';
import TakeQuiz from './components/takeQuiz/takeQuiz';
import QuizUser from './components/quizUser/quizUser';
// import withStyles from './components/users/withStyles';
import MainQuiz from './components/quiz-main/main-quiz';
export default (
  <Route path= "/" component = { App }>
    <IndexRoute component = { LoginPage } />
    <Route path = "signup" component = { SignupPage } />
    <Route path = "login" component = { LoginPage} />
    <Route path = "forget-password" component = { ForgotPassword } />
    <Route path = "users" component = { Users } />
    <Route path = "company" component = {Company} />
    <Route path = 'settings' component = {Settings} />
    <Route path = 'logout' component = {Logout} />
    <Route path = 'quiz' component = {Main} />
    <Route path = 'javascript-quiz' component = { MainJavascript } />
    <Route path = 'quiz-settings' component = { QuizSettings } />
    <Route path = 'create-quiz' component = { CreateQuiz } />
    <Route path ='listQuiz' component = {ListQuiz} />
    <Route path ='take-quiz' component = {TakeQuiz} />
    <Route path ='main-quiz' component = {MainQuiz} />
    <Route path = 'test' component = {QuizUser} />
    {/* <Route path = "test" component = { withStyles} /> */}
  </Route>
)
