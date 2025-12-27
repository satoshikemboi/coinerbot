import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Markets from './components/Markets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/navbar" element={<Navbar />}/>
      <Route path="/markets" element={<Markets />}/>
    </Routes>
  );
}
export default App;
