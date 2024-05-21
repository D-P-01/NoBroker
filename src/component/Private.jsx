import React,{ useState } from "react";
import { Navigate,Outlet } from "react-router-dom";
// import {auth1} from './firebase';
// import {useAuthState} from 'react-firebase-hooks/auth';


function Private() {
    // const [valid,setValid] = useState(false);
    
    const auth = localStorage.getItem("user");
    return auth ? <Outlet /> : <Navigate to="signup" />
}

export default Private;