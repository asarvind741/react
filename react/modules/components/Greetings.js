import React from 'react';
import { Component } from 'react';
import { Card, CardTitle,  CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './quiz/Main';
import '../styles/Greeting.css';

class Greetings extends Component {
    render(){
    /* return (
        <div>
        <MuiThemeProvider>
        <Card className="container">
            <CardTitle className="card-title" title="React Application" />
            <CardText>
                Please complete below Quiz and check Your level of knowledge here...
            </CardText>
        </Card>        
        </MuiThemeProvider>
         <MuiThemeProvider>
          <Card>
          <Main />
          </Card>
         </MuiThemeProvider>
         </div>
    ); */

    return (
        <div>
            <div className = "left-side">
            <h1>Hello</h1>
            </div>
            <div className = "right-side">
            <h1>Recent Activity</h1>
            </div>
        </div>
    )
}
}

export default Greetings;