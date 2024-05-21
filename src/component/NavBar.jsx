import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Nav(){
    const auth = localStorage.getItem('user');
    const navigate= useNavigate();
    function logout(){
        localStorage.clear();
        navigate("/signup");
    }
    return (
        <div>
        {/* <img 
            src={require("../logo.png")}
            alt="logo"
            className="logo"
        /> */}
            { auth?<ul className='nav-ul'>
                <li><Link to="/">Home</Link></li>
                {JSON.parse(auth).userType==="seller" && <li><Link to="/post">Post</Link></li>}
                {JSON.parse(auth).userType==="seller" && <li><Link to="/viewPost">ViewPost</Link></li>}
                <li className="logout"><Link onClick={logout} to="/signUp">Logout ({JSON.parse(auth).firstName})</Link></li>
                
            </ul>
            :
            <ul className='nav-ul nav-right'>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul>}
        </div>
    );
}

export default Nav;