import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function({children}){

    const { isLoggedIn } = useAuth();

    if(!isLoggedIn) return <Navigate to="/login"/>

    return children;
}