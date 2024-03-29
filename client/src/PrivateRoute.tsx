
import React, { useContext, useEffect, useState } from 'react'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingComponent } from './Components/loading-component';
import Navbar from './Components/navbar';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { get } from 'http';
import { Account, AccountResponseData } from './Types/Account';
import { AccountContext, AccountContextProvider, GET_ACCOUNT_QUERY } from './AccountContext';

const GET_WORKSPACES_FILTER = gql`
query {
  workspace {
    id,
    users {
      accountId,
      username,
      userState,
      managerWorkspaceUserId
    },
    departments {
      id,
      name
    },
  }
}
`;

export interface IAuthRouteProps {
    children: any
}

export const PrivateRoute: React.FC<IAuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [ accountData, setAccountData ] = useContext(AccountContext);

  const [
    getAccount,
    { loading: accountLoading, data: accountQueryData },
  ] = useLazyQuery(GET_ACCOUNT_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => setAccountData(data),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const arr = location.pathname.split('/');
        const isWorkspace = arr.includes('workspace');
  
        getAccount();
      } else {
        console.log('Unauthorized');
        navigate('/login');
      }
    });
    
    // Clean up the subscription
    return () => unsubscribe();
  }, [location.pathname, getAccount, navigate]);

  if (accountLoading || accountData == null) {
    return <div><LoadingComponent /></div>;
  }

  return (
    <div style={{ backgroundColor: '#00203FFF', minHeight: '100vh' }}>
      <Navbar workspace={null}></Navbar>      
      {children}
    </div>
  );
};