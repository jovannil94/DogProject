import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import DogSearch from './pages/DogSearch';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/dogSearch'} element={<DogSearch/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
