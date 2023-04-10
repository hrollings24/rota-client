import React, { useEffect, useState } from 'react'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingComponent } from './Components/loading-component';
import Navbar from './Components/navbar';
import { WorkspaceResponseData, WorkspaceSearchResponseData, WorkspacesForUser } from './Types/Workspace';
import { GetWorkspaceByUrl } from './Apis/workspace';
import { gql, useLazyQuery } from '@apollo/client';

const GET_WORKSPACES_FILTER = gql`
query($urlFilter: String){
    workspaces(where: {
      url: {
        contains: $urlFilter
      }
    }) {
      name,
      id,
      url
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
    
    useEffect(() => {}, [])

    const [
        getWorkspace,
        { called, data, loading, error },
      ] = useLazyQuery(GET_WORKSPACES_FILTER, {
        variables: {
            urlFilter: location.pathname.split('/').pop()!.toLowerCase(),
        },
        fetchPolicy: 'network-only',
        onCompleted: (d) => workspaceLoaded(d)
      });

    const workspaceLoaded = (workspaceParam: WorkspaceSearchResponseData) => {
        setWorkspace(workspaceParam.workspaces[0])
        setLoading(false)
    }


    onAuthStateChanged (auth, (user) => {
        if (user) {
            const arr = location.pathname.split('/');
            const isWorkspace = arr.includes('workspace')

            if (isWorkspace && !called)
            {
                getWorkspace()
            }
            else
            {
                setLoading(false)
            }
        
        } else {
            console.log("Unauthorized")
            navigate('/login')
        }
    })

    if (isLoading) return <div><LoadingComponent/></div>
    
    return (
        <div>
            <Navbar workspace={workspace}></Navbar>
            {children}
        </div>
    )
}