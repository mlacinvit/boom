import React from 'react'
import Cookies from 'js-cookie';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Main from './containers/Main';
import Register from './containers/Register';
import Login from './containers/Login';
import Product from './containers/Product';
import { ProtectedRoute } from './utils/utils';
import CookieProvider from './components/CookieProvider';
import Layout from './components/UI/layout';

const App = () => {
  const user = useSelector(state => state.users.user);
  let access = false
  if (user?.role === 'admin') {
    access = true
  }
  return (
    <CookieProvider>
      <Layout>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/product/:id" component={Product} />
          <Route path="/" component={Main} />
          {/* <ProtectedRoute
            isAllowed={Cookies.get('jwt') || user?.token}
            redirectTo="/login"
            path="/user"
            component={MyProfile}
          /> */}

        </Switch>
      </Layout>
    </CookieProvider>
  )
}

export default App;
