import React from 'react';
import AppToolbar from './AppToolbar/AppToolbar';

const Layout = ({ children }) => (
  <div >
    <AppToolbar />
    <>{children}</>
  </div>
)

export default Layout;
