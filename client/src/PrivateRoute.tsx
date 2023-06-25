
import React, { useEffect, useState } from 'react'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingComponent } from './Components/loading-component';
import Navbar from './Components/navbar';
import { WorkspaceResponseData, WorkspaceSearchResponseData, WorkspacesForUser } from './Types/Workspace';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { get } from 'http';
import { Account } from './Types/Account';

const GET_WORKSPACES_FILTER = gql`
query($urlFilter: String){
    workspaces(where: {
      url: {
        contains: $urlFilter
      }
    }) {
      name,
      url
    }
  }
`;

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


export interface IAuthRouteProps {
    children: any
}

export const PrivateRoute: React.FC<IAuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const [workspace, setWorkspace] = useState<WorkspacesForUser | null>(null);
  const [accountData, setAccountData] = useState<Account | null>(null);

  const [
    getWorkspace,
    { called: workspaceCalled, loading: workspaceLoading, data: workspaceQueryData },
  ] = useLazyQuery(GET_WORKSPACES_FILTER, {
    onCompleted: (data) => workspaceLoaded(data),
  });

  const [
    getAccount,
    { loading: accountLoading, data: accountQueryData },
  ] = useLazyQuery(GET_ACCOUNT_QUERY, {
    onCompleted: (data) => setAccountData(data),
  });

  const workspaceLoaded = (workspaceParam: WorkspaceSearchResponseData) => {
    setWorkspace(workspaceParam.workspaces[0]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const arr = location.pathname.split('/');
        const isWorkspace = arr.includes('workspace');

        getAccount();

        if (isWorkspace && !workspaceCalled) {
          console.log('getting workspace');
          getWorkspace({
            variables: {
              urlFilter: location.pathname.split('/').pop()?.toLowerCase(),
            },
          });
        } else if (!isWorkspace) {
          setLoading(false);
        }
      } else {
        console.log('Unauthorized');
        navigate('/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, getWorkspace, location.pathname, navigate, workspaceCalled]);

  if (isLoading || accountLoading) {
    return <div><LoadingComponent /></div>;
  }

  return (
    <div>
      <Navbar workspace={workspace} account={accountData}></Navbar>      
      {children}
    </div>
  );
};