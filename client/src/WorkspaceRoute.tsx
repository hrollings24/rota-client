
import React, { useEffect, useState } from 'react'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingComponent } from './Components/loading-component';
import Navbar from './Components/navbar';
import { GET_WORKSPACES_FILTER, WorkspaceResponse } from './Types/Workspace';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { get } from 'http';
import { Account, AccountResponseData } from './Types/Account';
import { AccountContextProvider } from './AccountContext';

const GET_ACCOUNT_QUERY = gql`
query {
  account
  {
    accountId,
    username,
    firstName,
    surname
    notifications{
      id
      title,
      message
    }
  }
}
`;


export interface IWorkspaceRouteProps {
    children: (workspace: WorkspaceResponse) => React.ReactNode;
}

export const WorkspaceRoute: React.FC<IWorkspaceRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const [workspace, setWorkspace] = useState<WorkspaceResponse | null>(null);
  const [accountData, setAccountData] = useState<AccountResponseData | null>(null);

 

  const [
    getAccount,
    { loading: accountLoading, data: accountQueryData },
  ] = useLazyQuery(GET_ACCOUNT_QUERY, {
    onCompleted: (data) => setAccountData(data),
  });

  const workspaceLoaded = (workspaceParam: WorkspaceResponse) => {
    setLoading(false);
    setWorkspace(workspaceParam);
  };

  const match = location.pathname.match(/\/workspace\/([^/]+)/);
    const workspaceId = match ? match[1].toLowerCase() : null;

  const [
    getWorkspace,
    { called: workspaceCalled, loading: workspaceLoading, data: workspaceQueryData },
  ] = useLazyQuery(GET_WORKSPACES_FILTER, {
    onCompleted: (data) => workspaceLoaded(data),
    context: {
      headers: {
        WorkspaceId: workspaceId
      },
    },
  });
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const arr = location.pathname.split('/');
        const isWorkspace = arr.includes('workspace');
  
        getAccount();
  
        if (isWorkspace && !workspaceCalled) {
          getWorkspace();
        } else if (!isWorkspace) {
          setLoading(false);
        }
      } else {
        console.log('Unauthorized');
        navigate('/login');
      }
    });
    
    // Clean up the subscription
    return () => unsubscribe();
  }, [location.pathname, workspaceCalled, getAccount, getWorkspace, navigate]);

  if (isLoading || accountLoading || accountData == null || workspace == null) {
    return <div><LoadingComponent /></div>;
  }

  return (
    <AccountContextProvider accountData={accountData}>
      <div style={{ backgroundColor: '#00203FFF', minHeight: '100vh' }}>
        <Navbar workspace={workspace}></Navbar>      
        {children(workspace!)}
      </div>
    </AccountContextProvider>
  );
};