import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import HomePage from './Pages/Home/home.page';
import LoginPage from './Pages/Login/login.page';
import SignupPage from './Pages/Login/signup.page';


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route path="/home" element={<HomePage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;