import '../../stylesheets/pages/Authentication.css'

import { Link, useHistory, useLocation } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'

import AppContext from '../other/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particles from 'react-tsparticles'
import { axiosInstance } from '../../axiosAPI'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import jwt from 'jwt-decode'
import particlesOptions from '../../particles.json'

enum AuthenticationMethod {
  Login,
  Signup,
}

function Authentication(props) {
  const location = useLocation()
  
  const [ authMethod, setAuthMethod ] = useState<AuthenticationMethod>(
    /\/login\/?/im.test(location.pathname) ? AuthenticationMethod.Login : AuthenticationMethod.Signup
  )
  const [ errorStatus, setErrorStatus ] = useState<Number | null>(null)

  const usernameRef = useRef()
  const passwordRef = useRef()

  const history = useHistory()
  const { setUser, setIsLoadingUser } = useContext(AppContext)

  async function useAuth(e) {
    e.preventDefault()
    
    if (authMethod === AuthenticationMethod.Login) {
      axiosInstance.post(
        `/auth/token/obtain/`, {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }
      )
      .then(response => {
        axiosInstance.defaults.headers['Authorization'] = `JWT ${response.data.access}`
        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)

        const tokenObj = jwt(localStorage.getItem('access_token'))
        
        setUser(tokenObj['user_id'])
        setIsLoadingUser(false)

        history.push('/menu')
      })
      .catch(err => {
        setErrorStatus(err.response.status)
      })
    }

    else if (authMethod === AuthenticationMethod.Signup) {
      axiosInstance.post(
        `/auth/user/create/`, {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }
      )
      .then(() => {
        history.push('/login')
      })
      .catch(err => {
        setErrorStatus(err.response.status)
      })
    }
  }

  useEffect(() => {
    setAuthMethod(
      /\/login\/?/im.test(location.pathname)
        ? AuthenticationMethod.Login
        : AuthenticationMethod.Signup
    )
  }, [ location, errorStatus ])
  
  return (
    <div className='authentication-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='authentication-box'>
        <div className='authentication-header'>
          <FontAwesomeIcon icon={faComments} />
          Banter
          <p className='tagline'>Connect with the ones who matter most.</p>
        </div>
        <div className='authentication-form'>
          <input type='text' placeholder='Email address' ref={usernameRef} />
          <input type='password' placeholder='Password' ref={passwordRef} />
          {
            errorStatus === null ? null
              : errorStatus === 406 ? <p className='error'>Invalid login credentials.</p>
              : <p className='error'>An error occurred.</p>
          }
          <button
            className='submit-button'
            onClick={e => useAuth(e)}
          >
            {
              authMethod === AuthenticationMethod.Login
                ? 'Log in'
                : 'Sign up'
            }
          </button>
        </div>
        <div className='change-authentication-method'>
          <p className='tagline'>
            {
              authMethod === AuthenticationMethod.Login
                ? 'Don\'t have an account?'
                : 'Already have an account?'
            }
          </p>
          <Link to={authMethod === AuthenticationMethod.Login ? '/signup' : '/login'}>
            {
              authMethod === AuthenticationMethod.Login
                ? 'Create one.'
                : 'Sign in.'
            }
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Authentication
