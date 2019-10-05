import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import LoginPage from './components/auth/login/LoginPage';
import RegisterPage from './components/auth/register/RegisterPage';
import UserProfile from './components/users/UserProfile';
import LogOut from './components/auth/login/LogOut';
import CategoryPage from './components/category/CategoryPage';
import LotFull from './components/lot-full/Lot-full';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/logout' component={LogOut} />

        <Route exact path='/category/:name'
            render={({ match }) => {
                const { name } = match.params;
                return <CategoryPage name={name} />
            }} />
        <Route exact path='/lot/:torgId'
            render={({ match }) => {
                const { torgId } = match.params;
                return <LotFull torgId={torgId} />
            }} />
        <Route path='/fulllot' component={LotFull} />

  </Layout>
);
