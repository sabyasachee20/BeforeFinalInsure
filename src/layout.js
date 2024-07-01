import React from 'react';
import './layout.css'; // Optional: Create a CSS file for layout-specific styles
import Navbar1 from './Userinterface/Usernavbar';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar1 />
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
