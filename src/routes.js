import React from 'react';
import { Route} from 'react-router-dom';
import DefaultLayout from './Components/DefaultLayout';
import BlankLayout from './Components/BlankLayout';
import Login from './Components/Login';
import WelcomeUser from './Components/WelcomeUser';
import InventoryManagement from './Components/InventoryManagement';
import auth from './auth';
import Logout from './Components/Logout';


const routes = [
    {
      path: '/login',
      layout: BlankLayout,
      component: Login,
    },
    {
        path: '/logout',
        layout: BlankLayout,
        component: Logout,
      },
    {
      path: '/',
      exact: true,
      layout: DefaultLayout,
      component: auth(WelcomeUser),
    },
    {
      path: '/dashboard/inventory',
      exact: true,
      layout: DefaultLayout,
      component: auth(InventoryManagement),
    },
  ];
  
  const AppRoutes = () => {
    return (
        <>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={() => (
              <route.layout>
                <route.component />
              </route.layout>
            )}
          />
        ))}
        </>
    );
  };
  
  export default AppRoutes;
