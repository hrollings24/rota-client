import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import HomePage from './Pages/Home/home.page';
import LoginPage from './Pages/Login/login.page';
import SignupPage from './Pages/Login/signup.page';


function App() {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
            <BrowserRouter>
                    <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/signup" element={<SignupPage/>} />
                </Routes>
                </BrowserRouter>
            </div>
        </div>  
    );
}

export default App;