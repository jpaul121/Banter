import '../../stylesheets/pages/Authentication.css'

import { Link, useHistory, useLocation } from 'react-router-dom'
import React, { useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particles from 'react-tsparticles'
import { axiosInstance } from '../../axiosAPI'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import particlesOptions from '../../particles.json'

enum AuthenticationMethod {
  Login,
  Signup,
}

function Authentication() {
  const [ authMethod, ] = useState<AuthenticationMethod>(
    location.pathname === '/login' ? AuthenticationMethod.Login : AuthenticationMethod.Signup
  )
  const [ errorStatus, setErrorStatus ] = useState<Number | null>(null)

  const emailRef = useRef()
  const passwordRef = useRef()

  const history = useHistory()
  const location = useLocation()

  async function useAuth(e) {
    e.preventDefault()
    
    if (authMethod === AuthenticationMethod.Login) {
      axiosInstance.post(
        `/auth/token/obtain`, {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      )
      .then(response => {
        axiosInstance.defaults.headers['Authorization'] = `JWT ${response.data.access}`
        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)

        history.push('/messages')
      })
      .catch(err => {
        setErrorStatus(err.response.status)
      })
    }

    else if (authMethod === AuthenticationMethod.Signup) {
      axiosInstance.post(
        `/auth/user/create`, {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      )
      .then(response => {
        history.push('/login')
      })
      .catch(err => {
        setErrorStatus(err.response.status)
      })
    }
  }
  
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
          <input type='text' placeholder='Email address' ref={emailRef} />
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
                ? 'Sign in'
                : 'Register'
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
          <Link to={`/signup`}>
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
