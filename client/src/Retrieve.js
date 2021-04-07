// import logo from './logo.svg';
// import './App.css';
// import {
//   Container,
//   Grid,
// } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },

// }));
// function App() {
//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"     
//   //       >
//   //         Learn React
//   //       </a>
//   //     </header>
//   //   </div>
//   // );
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
// <Grid container spacing={1}>
//   <Grid container item xs={12} spacing={3}>
//     Test
//   </Grid>
//   <Grid container item xs={12} spacing={3}>
//   Test
//   </Grid>
//   <Grid container item xs={12} spacing={3}>
//   Test
//   </Grid>
// </Grid>
// </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import logo from './moh_logo.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Axios from "axios";
import { useLocation, useParams } from 'react-router-dom';

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






export default function Retrieve() {
  const classes = useStyles();
  const [user, setUser] = useState([])

  let location = useLocation();
  //backend



  useEffect(() =>  {
    Axios.get('http://localhost:3001/api/other',{params: {tokenId:location.state.row.tokenId}})
    .then(function (response) {
      // alert("successful")
      // console.log(response.data.recordset)

      setUser(response.data.recordset)
      // console.log(response.data["recordsets"][0][0]);
    })


  })

  


  return (
    <div className={classes.root}>
        <Grid container className={classes.marginBottom}>
        <img src={logo} />
        </Grid>
        <Grid container item xs={12} className={classes.marginBottom}>
          Infected person: {location.state.row.firstName + " " + location.state.row.lastName}
        </Grid>
        <Grid container item xs={12}>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="left">NRIC</StyledTableCell>
            <StyledTableCell align="left">First Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">Contact No.</StyledTableCell>
            <StyledTableCell align="left">Token Id</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        {user.map((row) => (
            <StyledTableRow key={row.nric}>
              <StyledTableCell align="left">{row.nric}</StyledTableCell>
              <StyledTableCell align="left">{row.firstName}</StyledTableCell>
              <StyledTableCell align="left">{row.lastName}</StyledTableCell>
              <StyledTableCell align="left">{row.contactNo}</StyledTableCell>
              <StyledTableCell align="left">{row.tokenId}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
   
    </div>
  );
}