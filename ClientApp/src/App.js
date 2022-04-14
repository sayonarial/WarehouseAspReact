import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import ItemsData from './components/ItemsData'

import './custom.css'
import UserDashBoard from './components/UserDashboard';
import Register from './components/Register';
import Login from './components/login';

import { useState, createContext } from "react";
import { AuthContext } from './context';
const UserContext = createContext()


const App = (props) => {

  const [isAuth, setIsAuth] = useState(true);

    return (
      <AuthContext.Provider value = {{
        isAuth,
        setIsAuth
      }}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route path='/items' component={UserDashBoard} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Layout>
      </AuthContext.Provider>


    )
}

export default App;