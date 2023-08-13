import logo from './logo.svg';
import './App.css';
import Home from './Page/Home/Home';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './Page/Auth/Auth';
function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Auth />} />
    <Route path='/board' element={<Home />} />
  </Routes>
  </BrowserRouter>
  );
}
export default App;