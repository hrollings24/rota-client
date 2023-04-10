import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import HomePage from './Pages/Home/home.page';
import LoginPage from './Pages/Login/login.page';
import SignupPage from './Pages/Login/signup.page';
import { AuthProvider } from './AuthProvider';
import { PrivateRoute } from './PrivateRoute';
import WorkspaceHomePage from './Pages/Workspace/workspace.home.page';


function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider> 
                    <Routes>
                        <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                        <Route path="/home" element={<PrivateRoute><HomePage/></PrivateRoute>} />
                        <Route path="/workspace/:id" element={<PrivateRoute><WorkspaceHomePage/></PrivateRoute>} />
                    </Routes>
                </AuthProvider> 
            </BrowserRouter>
        </div>
    );
}

export default App;