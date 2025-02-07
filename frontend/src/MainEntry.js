import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const MainEntry = () => {
  return (
    <div>
        <BrowserRouter>
            <ToastContainer theme='dark'/>
            <Routes>
                <Route path={'/'} element={<Register />}/>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'/home'} element={<Home />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default MainEntry