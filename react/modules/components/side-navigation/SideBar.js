import React from 'react';
import './SideBar.css';
import SideNaviationItem from './side-navigation-item';
import axios from 'axios';
import { Link } from 'react-router';

class Sidebar extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      tab1 : 0,
      tab2 : 0,
      quizList:[]
    }
   /*  axios.get('http://localhost:5000/api/quiz/get-quiz-list').then((result) => {
      this.setState({quizList:result.data})
    })
    .catch((err)=> {
    }) */
    }
    componentWillMount() {

    }

    tabChange() {
      if(this.state.tab2 == 1)
      this.setState({tab2:0})
      else
      this.setState({tab2:1})
  }

  tabChange1() {
    if(this.state.tab1 == 1)
    this.setState({tab1:0})
    else
    this.setState({tab1:1})
}
    render(){

      const sideNavItem = this.state.quizList.map((item) => {
        return (<SideNaviationItem
        key = { item._id}
        item = { item }
        />
        )
      })
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userInfo = JSON.parse(localStorage.getItem('currentUserInfo'));

    return (

        <div className="sidenav">
        {(isLoggedIn)?
        <div>
          <div>
         <a href="my-quiz" onClick = {this.tabChange1.bind(this)}>My Quizzes
         {(this.state.tab1 == 1)?
         <span>
           { sideNavItem }
         </span>
        :null
       }</a>
       </div>
       {(userInfo && userInfo.role == 'Admin' || userInfo.role == 'admin')?
       <div>
<a href="#" onClick = {this.tabChange.bind(this)}>Manage Quiz
        {(this.state.tab2 == 1)?
         <span>
         <a href ="/create-quiz">New Quiz</a>
         <a href ="/manage-quiz">View History</a>
         </span>
        :null
       }

         </a>
         <a href="/users">Manage User</a>
         <Link to = "/calendar"> calendar</Link>

         </div>
         :null
        }

        </div>
       :null}

       </div>

    )
}

}

export default Sidebar;
