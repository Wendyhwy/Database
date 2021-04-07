
import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import logo from './National_University_Health_System_Logo.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Axios from "axios";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  },
  table: {
    minWidth: 700,
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  }
}));

function createData(id, nric, firstName, lastName, email, contactNo) {
  return { id, nric, firstName, lastName, email, contactNo };
}

const rows = [
  createData(1, "S7351347H", "QiZhi", "Ang", "angqizhi@gmail.com", "99392018"),
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);






export default function App() {
  const classes = useStyles();
  const [user, setUser] = useState([])

  //backend


    useEffect(() =>  {
      Axios.get('http://localhost:3002/api/nuhs')
      .then(function (response) {
        setUser(response.data.recordset)
        console.log(response.data.recordset)
      })
    })


  return (
 
    <div className={classes.root}>
        <Grid container className={classes.marginBottom}>
        <img src={logo} />
        </Grid>
        <Grid container item xs={12} className={classes.marginBottom}>
          Total Number of Cases Dashboard
        </Grid>
        <Grid container item xs={12}>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Hospital</StyledTableCell>
            <StyledTableCell align="left">Total Number of Cases</StyledTableCell>
            <StyledTableCell align="left">Total Confirmed Cases</StyledTableCell>
            <StyledTableCell align="left">Newly Reported Cases (as of today)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(user)} */}
          {user.map((row) => (
            <StyledTableRow key={row.nric}>
              <StyledTableCell align="left">{row.hospitalName}</StyledTableCell>
              <StyledTableCell align="left">{row.totalNumofCases}</StyledTableCell>
              <StyledTableCell align="left">{row.totalConfirmedCases}</StyledTableCell>
              <StyledTableCell align="left">{row.totalNewlyReportedCases}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
   
    </div>
  );
}