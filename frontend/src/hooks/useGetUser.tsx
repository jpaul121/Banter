import React, { useEffect, useState } from 'react'
import jwt, { JwtPayload } from 'jwt-decode'

import { Redirect } from 'react-router-dom'
import { axiosInstance } from '../axiosAPI'

interface BanterToken extends JwtPayload {
  user: string,
}

function useGetUser() {
  const [ user, setUser ] = useState<string | null>(null)
  const [ isLoadingUser, setIsLoadingUser ] = useState<boolean>(true)

  async function getUser() {
    if (localStorage.getItem('refresh_token')) {
      axiosInstance
      .post('/auth/token/refresh/', { refresh: localStorage.getItem('refresh_token') })
      .then(response => {
        if (response.data.access && response.data.refresh) {
          localStorage.setItem('access_token', response.data.access)
          localStorage.setItem('refresh_token', response.data.refresh)

          axiosInstance.defaults.headers['Authorization'] = `JWT ${response.data.access}`
        } 
        
        else {
          localStorage.clear()
          return <Redirect to={'/login'} />;
        }
      })
      .catch(err => {
        localStorage.clear()
        throw err;
      })
      
      if (localStorage.getItem('access_token')) {
        const tokenObj = jwt<BanterToken>(localStorage.getItem('access_token')!)

        setUser(tokenObj['user_id'])
        setIsLoadingUser(false)

        return;
      }
    }
    
    return <Redirect to={'/login'} />;
  }

  useEffect(() => {
    getUser()
  })

  return {
    user,
    setUser,
    isLoadingUser,
    setIsLoadingUser,
  };
}

export default useGetUser
