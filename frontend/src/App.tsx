import './css-reset.css'

import React, { useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import AppContext from './components/other/AppContext'
import Authentication from './components/pages/Authentication'
import Composition from './components/pages/Composition'
import MainMenu from './components/pages/MainMenu'
import MessageList from './components/pages/MessageList'
import MessageView from './components/pages/MessageView'
import ProtectedRoute from './components/authentication/ProtectedRoute'
import Splash from './components/pages/Splash'
import useGetMessages from './hooks/useGetMessages'
import useGetUser from './hooks/useGetUser'

function App() {
  const { user, setUser, isLoadingUser, setIsLoadingUser } = useGetUser()
  const messageData = useGetMessages()
  const [ searchQuery, setSearchQuery ] = useState<string>('')
  
  return (
    <Router>
      <AppContext.Provider value={{ messageData, isLoadingUser, setIsLoadingUser, searchQuery, setSearchQuery, user, setUser }}>
        <Switch>
          <Route exact path='/' component={Splash} />
          <ProtectedRoute path='/menu' component={MainMenu} />
          <ProtectedRoute path='/messages/:message_id' component={MessageView} />
          <ProtectedRoute path='/compose' component={Composition} />
          <ProtectedRoute path='/inbox' component={MessageList} />
          <ProtectedRoute path='/outbox' component={MessageList} />
          <Route path='/signup' component={Authentication} />
          <Route path='/login' component={Authentication} />
        </Switch>
      </AppContext.Provider>
    </Router>
  );
}

export default App