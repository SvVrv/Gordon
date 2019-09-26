import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import LoginPage from './components/auth/login/LoginPage';
import RegisterPage from './components/auth/register/RegisterPage';
import UserProfile from './components/users/UserProfile';
import LogOut from './components/auth/login/LogOut';
import CategoryPage from './components/category/CategoryPage';
export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/profile' component={UserProfile} />
        <Route path='/logout' component={LogOut} />
        <Route path='/:name'
            render={({ match }) => {
                const { name } = match.params;
                return <CategoryPage name={name} />
            }} />
  </Layout>
);
