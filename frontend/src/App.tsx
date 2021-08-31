import './css-reset.css'

import React, { useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import AppContext from './components/other/AppContext'
import Authentication from './components/pages/Authentication'
import MainMenu from './components/pages/MainMenu'
import ProtectedRoute from './components/authentication/ProtectedRoute'
import Splash from './components/pages/Splash'
import useGetUser from './hooks/useGetUser'

function App() {
  const { user, setUser, isLoadingUser, setIsLoadingUser } = useGetUser()
  const [ searchQuery, setSearchQuery ] = useState<string>('')
  
  return (
    <Router>
      <AppContext.Provider value={{ isLoadingUser, setIsLoadingUser, searchQuery, setSearchQuery, user, setUser }}>
        <Switch>
          <Route exact path='/' component={Splash} />
          <ProtectedRoute path='/menu' component={MainMenu} />
          <Route path='/signup' component={Authentication} />
          <Route path='/login' component={Authentication} />
        </Switch>
      </AppContext.Provider>
    </Router>
  );
}

export default App