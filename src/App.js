import logo from './logo.svg';
import './App.css';
import Home from './Page/Home/Home';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './Page/Auth/Auth';
import { createContext, useState } from 'react';
export const appcontext=createContext();
function App() {
  const [loggedUser,setLoggedUser]=useState([]);
  return (
    <appcontext.Provider value={{loggedUser,setLoggedUser}}>
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Auth />} />
    <Route path='/board' element={<Home />} />
  </Routes>
  </BrowserRouter>
  </appcontext.Provider>
  );
}
export default App;