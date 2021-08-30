import React from 'react'
import Particles from 'react-tsparticles'
import particlesOptions from '../../particles.json'
import '../../stylesheets/pages/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='login-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='login-box'>
        <div className='login-header'>
          <FontAwesomeIcon icon={faComments} />
          Banter
          <p className='tagline'>Connect with the ones who matter most.</p>
        </div>
        <div className='login-form'>
          <input type='text' placeholder='Email address' />
          <input type='password' placeholder='Password' />
          <button className='submit-button'>Sign in</button>
        </div>
        <div className='signup'>
          <p className='tagline'>
            Don't have an account?
          </p>
          <Link to={`/signup`}>
            Create one.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login
