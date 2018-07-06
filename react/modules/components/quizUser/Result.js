import React from 'react';
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn, TablePagination,
  TableSortLabel} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

function Result({quizName, marksObtained}) {
  let resultStatus;
  if(marksObtained>=60){
    resultStatus = "Pass"
  }
  else{
    resultStatus = "Fail"
  }
  if(!marksObtained || !marksObtained){
    return (
      <div>Loading...</div>
    )
  }
  else {
  return (
    <MuiThemeProvider>
    <Table>
        <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn>Quiz Name</TableHeaderColumn>
                <TableHeaderColumn>Marks</TableHeaderColumn>
                <TableHeaderColumn>Result</TableHeaderColumn>

            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox  ={false} adjustForCheckbox={false}>
        <TableRow>
                <TableRowColumn>{quizName}</TableRowColumn>
                <TableRowColumn>{marksObtained}</TableRowColumn>
                <TableRowColumn>{resultStatus}</TableRowColumn>

            </TableRow>
        </TableBody>
    </Table>
    </MuiThemeProvider>
  );
}
}


export default Result;
