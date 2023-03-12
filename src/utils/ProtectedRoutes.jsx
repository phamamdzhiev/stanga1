import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from "../contexts/AuthContext.jsx";

export default function ProtectedRoutes() {
    const auth = useAuthContext();

    return (
        auth ? <Outlet/> : <Navigate to='/login'/>
    )
}