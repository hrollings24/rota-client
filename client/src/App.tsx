import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import HomePage from './Pages/Home/home.page';
import LoginPage from './Pages/Login/login.page';
import SignupPage from './Pages/Login/signup.page';
import { AuthProvider } from './AuthProvider';
import { PrivateRoute } from './PrivateRoute';
import AccountSettingsPage from './Pages/Account/account.settings.page';
import { WorkspaceRoute } from './WorkspaceRoute';
import CreateWorkspacePage from './Pages/Workspace/createworkspace.page';
import WorkspaceParentPage from './Pages/Workspace/workspace.parent.page';
import { WorkspaceSettingsPage } from './Pages/Workspace/admin/workspace.admin.settings.page';
import { AccountContext } from './AccountContext';
import DepartmentPage from './Pages/Workspace/user/workspace.department.page';


function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider> 
                    <Routes>
                        <Route path="/" element={<PrivateRoute key={1}><HomePage /></PrivateRoute>} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                        <Route path="/home" element={<PrivateRoute key={2}><HomePage/></PrivateRoute>} />
                        <Route path="/account" element={<PrivateRoute key={2}><AccountSettingsPage/></PrivateRoute>} />
                        <Route path="/workspace/create" element={<PrivateRoute key={2}><CreateWorkspacePage/></PrivateRoute>} />
                        <Route path="/workspace/:id" element={<WorkspaceRoute>{(workspace) => (
                            <div>
                            <WorkspaceParentPage workspace={workspace} />
                            </div>
                        )}</WorkspaceRoute>} />
                         <Route path="/workspace/:id/settings" element={<WorkspaceRoute>{(workspace) => (
                            <div>
                            <WorkspaceSettingsPage workspace={workspace} />
                            </div>
                        )}</WorkspaceRoute>} />
                        <Route path="/workspace/:id/department/:id" element={<WorkspaceRoute>{(workspace) => (
                            <div>
                            <DepartmentPage workspace={workspace} />
                            </div>
                        )}</WorkspaceRoute>} />
                    </Routes>
                </AuthProvider> 
            </BrowserRouter>
        </div>
    );
}

export default App;