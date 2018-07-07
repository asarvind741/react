import React from 'react';
import { deleteUser,updateUserNow } from '../../services/UserService';
import PersonRow from './PersonRow';
import {connect} from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn, TablePagination,
        TableSortLabel} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';


export class UsersForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userslist: [],
            userlistFromChild:[]

        };
        this.myCallback = this.myCallback.bind(this);
        this.addUser = this.addUser.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.search = this.search.bind(this);
        this.tempData=[];
        this.currentFilter = {};
    }

    componentDidMount() {
        this.props.getUsersList().then(response => {
            if (response.status === 200) {
                this.tempData = response.usersList;
                this.setState({ userslist: response.usersList });
            }
        });
    }
    myCallback (dataFromChild) {
        this.setState({ userslist: dataFromChild });
    }
    addUser(event){
        
        var row = {
            id:this.state.userslist.length + 1,
            firstname:"",
            lastname:"",
            email:"",
            role:"User",
            company:''
        };
        this.state.userslist.push(row);
        this.setState({})
      
    }

    search(event) {
        if(event.target.value) {
        let patt = new RegExp(event.target.value, "i")
        let newarr = this.tempData.filter((user) => {
            if(user.firstname.search(patt) >=0 || user.email.search(patt) >=0 || user.company.search(patt) >=0 || user.role.search(patt) >=0 || user.lastname.search(patt) >=0) {
            return true;
            }
            else {
            return false;
            }
            
        } )
        this.setState({userslist:newarr});
    }
    else
    this.setState({userslist:this.tempData});
    }
   
    sortTable(event) {
        if(typeof this.currentFilter[event.currentTarget.getAttribute('data-field')] != 'undefined') {
            ++this.currentFilter[event.currentTarget.getAttribute('data-field')];
        }
        else 
        this.currentFilter[event.currentTarget.getAttribute('data-field')] = 0;
        let newarr = this.state.userslist.sort(this.getCompareFunc(event.currentTarget.getAttribute('data-field')))
        this.setState({userslist:newarr})
    }

    getCompareFunc(field) {
        return (a,b) => {
            var nameA = a[field].toUpperCase(); // ignore upper and lowercase
            var nameB = b[field].toUpperCase(); // ignore upper and lowercase
            if(this.currentFilter[field]%2 == 0) {
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
        }
        else
        {
            if (nameA < nameB) {
                return 1;
              }
              if (nameA > nameB) {
                return -1;
              }
            
              // names must be equal
              return 0;
        }
        }
    }
    render() {
        let rows = this.state.userslist.map(person => {
            return (
                <PersonRow key={person.id} data={person} 
                deleteUser = {this.props.deleteUser}
                updateUserNow = {this.props.updateUserNow}
                addFlashMessage = {this.props.addFlashMessage}
                myCallback = {this.myCallback} />
            );
        })
        return (
            <div>
            <button className = "btn btn-primary" onClick ={this.addUser}>Add New User</button>
            
            <MuiThemeProvider>
            <TextField 
            onChange={this.search} inputStyle={{   textAlign: 'center' }}


            />
            </MuiThemeProvider>
            <MuiThemeProvider>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow onCellClick={((e) => this.sortTable(e))}>
                        <TableHeaderColumn data-field="firstname">First Name</TableHeaderColumn>
                        <TableHeaderColumn data-field="lastname">Last Name</TableHeaderColumn>
                        <TableHeaderColumn data-field="email">E-Mail</TableHeaderColumn>
                        <TableHeaderColumn data-field="role">Role</TableHeaderColumn>
                        <TableHeaderColumn data-field="company">Company</TableHeaderColumn>

                    </TableRow>
                </TableHeader>
                <TableBody >
                    {rows}
                </TableBody>
            </Table>
            </MuiThemeProvider>
            </div>
        );
    }
}

/* const PersonRow = (props) => {

    return (
        <tr>
            <td>
                {props.data.firstname}
            </td>
            <td>
                {props.data.lastname}
            </td>
            <td>
                {props.data.email}
            </td>
            <td>
            <input type="button" className="btn btn-primary" value="Edit" /* onClick={this.handleRemoveUser} />
            </td>
            <td>
                <input type="button" className="btn btn-danger" value="Remove" /* onClick={this.handleRemoveUser}  />
            </td>
        </tr>
    )
} */



UsersForm.propTypes = {
    getUsersList: React.PropTypes.func.isRequired,
    deleteUser:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

UsersForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default connect(null, { deleteUser, addFlashMessage,updateUserNow})(UsersForm);