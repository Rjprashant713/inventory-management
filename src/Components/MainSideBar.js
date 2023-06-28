import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

const MainSidebar = () => {
  const location = useLocation();

  return (
    <aside className="main-sidebar">
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          
          <Link to="/">
          <HomeIcon />
            <span className='sidenav-item-span'>Home</span>
          </Link>
        </li>
        <li className={location.pathname === '/dashboard/inventory' ? 'active' : ''}>
        
          <Link to="/dashboard/inventory">
          <MenuIcon />
            <span className='sidenav-item-span'>Inventory</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MainSidebar;
