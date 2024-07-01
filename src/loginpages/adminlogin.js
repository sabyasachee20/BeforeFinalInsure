import React from 'react';

import adminlogin from '../images/loginimages/adminlogin.png';
import LoginComponent from './logincomponent';
 
const AdminLogin = () => {
    return (
        <div>
            <LoginComponent
                loginUrl="http://localhost:8008/users/login"
                welcomsmsg="Welcome back Admin"
                imageUrl={adminlogin}
                role="admin"
            />
 
        </div>
    );
};
 
export default AdminLogin;
