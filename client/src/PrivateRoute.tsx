import React, { useEffect, useState } from 'react'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { LoadingComponent } from './Components/loading-component';

export interface IAuthRouteProps {
    children: any
}

export const PrivateRoute: React.FC<IAuthRouteProps> = ({ children }) => {

    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {}, [])

    onAuthStateChanged (auth, (user) => {
        if (user) {
            setLoading(false)
        } else {
            console.log("Unauthorized")
            navigate('/login')
        }
    })

    if (loading) return <div><LoadingComponent/></div>
    
    return <div>{children}</div>
}