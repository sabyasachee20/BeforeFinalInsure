import React from 'react';

import agentlogin from '../images/loginimages/agentlogin.png';
import LoginComponent from './logincomponent';
 
const AgentLogin = () => {
    return (
        <div>
            <LoginComponent
                loginUrl="http://localhost:8008/users/login"
                welcomsmsg="Welcome back Agent"
                imageUrl={agentlogin}
                role="agent"
            />
 
        </div>
    );
};
 
export default AgentLogin;