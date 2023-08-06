import React from 'react'
import Cookies from 'js-cookie';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProtectedRoute } from './utils/utils';

import Main from './containers/Main';
import Register from './containers/Register';
import Login from './containers/Login';
import Product from './containers/Product';
import MyProfile from './containers/MyProfile';
import CookieProvider from './components/CookieProvider';
import Layout from './components/UI/layout';
import NewProduct from './containers/NewProduct';
import EditProduct from './containers/EditProduct';
import MyProduct from './containers/MyProduct';
import './App.css';

const App = () => {
  const user = useSelector(state => state.users.user);

  let access = false
  if (user?.role === 'admin') {
    access = true
  }


  return (
    <CookieProvider>
      <Layout>
        <div className='back'>
          <div className='container'>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt') || user?.token}
                redirectTo="/login"
                path="/profile"
                component={MyProfile}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt') || user?.token}
                redirectTo="/login"
                path="/newproduct/"
                component={NewProduct}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt') || user?.token}
                redirectTo="/login"
                path="/editproduct/:id"
                component={EditProduct}
              />
              <ProtectedRoute
                isAllowed={Cookies.get('jwt') || user?.token}
                redirectTo="/login"
                path="/myproduct"
                component={MyProduct}
              />
              <Route path="/product/:id" component={Product} />
              
              <Route path="/" component={Main} />


            </Switch>
          </div>
        </div>
      </Layout>
    </CookieProvider>
  )
}

export default App;
