import React, { useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import AppContext from './components/other/AppContext'
import Login from './components/pages/Login'
import ProtectedRoute from './components/authentication/ProtectedRoute'
import Signup from './components/pages/Signup'
import Splash from './components/pages/Splash'
import useGetUser from './hooks/useGetUser'

import './css-reset.css'

function App() {
  // const { user, setUser, isLoadingUser } = useGetUser()
  const [ searchQuery, setSearchQuery ] = useState<string>('')
  
  return (
    <Router>
      {/* <AppContext.Provider value={{ isLoadingUser, searchQuery, setSearchQuery, user, setUser }}> */}
        <Switch>
          <Route exact path='/' component={Splash} />
          {/* <Route path='/signup' component={Signup} /> */}
          {/* <Route path='/login' component={Login} /> */}
        </Switch>
      {/* </AppContext.Provider> */}
    </Router>
  );
}

export default App