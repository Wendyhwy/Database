

import React, { Component } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import MOH from './Moh';
import Upload from './Upload';
import Retrieve from './Retrieve'
import Who from './Who'
import './App.css';
  
class App extends Component { 
  render() { 
    return ( 
       <BrowserRouter> 
            <Routes> 
              <Route path='/' element={<MOH/>}></Route> 
              <Route path='/upload' element={<Upload/>}></Route> 
              <Route path='/retrieve/:id' element={<Retrieve/>}></Route>
              <Route path='/nuhs' element={<Who/>}></Route>
            </Routes> 
         
       </BrowserRouter> 
   ); 
  } 
} 
  
export default App; 