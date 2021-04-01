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

import React, { Component } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import MOH from './Moh';
import Upload from './Upload';
import Retrieve from './Retrieve'
import './App.css'; 
  
class App extends Component { 
  render() { 
    return ( 
       <BrowserRouter> 
 
            <Routes> 
              <Route path='/' element={<MOH/>}></Route> 
              <Route path='/upload' element={<Upload/>}></Route> 
              <Route path='/retrieve/:id' element={<Retrieve/>}></Route>
            </Routes> 
         
       </BrowserRouter> 
   ); 
  } 
} 
  
export default App; 