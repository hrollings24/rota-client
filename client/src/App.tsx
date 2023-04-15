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
import AccountSettingsPage from './Pages/Account/account.settings.page';


function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider> 
                    <Routes>
                        <Route path="/" element={<PrivateRoute key={1}><HomePage/></PrivateRoute>} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                        <Route path="/home" element={<PrivateRoute key={2}><HomePage/></PrivateRoute>} />
                        <Route path="/account" element={<PrivateRoute key={2}><AccountSettingsPage/></PrivateRoute>} />
                        <Route path="/workspace/:id" element={<PrivateRoute key={3}><WorkspaceHomePage/></PrivateRoute>} />
                    </Routes>
                </AuthProvider> 
            </BrowserRouter>
        </div>
    );
}

export default App;