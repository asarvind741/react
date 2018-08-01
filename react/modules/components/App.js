import React, { Component } from 'react';
import { render } from 'react-dom';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Header from './Header';
import { Navbar } from "react-bootstrap";

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlashMessagesList from './flash/FlashMessagesList';
import NavigationBar from './NavigationBar';
import Footer from './footer/Footer';
import Sidebar from './side-navigation/SideBar'
import './side-navigation/SideBar.css'

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  //  shouldComponentUpdate() {
  //     if (localStorage.getItem('isLoggedIn')) {
  //       return true;
  //     }
  //     return true;
  //   }

  //   componentDidUpdate(){
  //     this.setState({
  //       loggedIn: true
  //     })
  //   } 


  render() {
    return (
      <div className="container">
        {(localStorage.getItem('isLoggedIn')) ?

          <NavigationBar /> : ''}
        {(localStorage.getItem('isLoggedIn')) ?

          <Sidebar /> : ''}
        <div className="right-sidebar">
          <FlashMessagesList />
          {this.props.children}
          <div>
            {(localStorage.getItem('isLoggedIn')) ?

              <Footer /> : ''}
          </div>
        </div>
      </div>

    );
  }
}
export default App;