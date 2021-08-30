import React from 'react'
import Particles from 'react-tsparticles'
import '../../stylesheets/pages/Splash.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import particlesOptions from '../../particles.json'

function Splash() {
  return (
    <div className='splash-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='header'>
        <div className='title'>
          <FontAwesomeIcon icon={faComments} />
          &nbsp;
          Banter
        </div>
        <div className='header-links'>
          <Link to={`/login`}>
            Log in
          </Link>
          &nbsp;
          or
          &nbsp;
          <Link to={`/signup`}>
            Sign up
          </Link>
        </div>
      </div>
      <div className='footer'>
        <p>
          © 2021 Jean Valencia. All rights reserved.
        </p>
        <div className='footer-icons'>
          <a href='https://github.com/jpaul121'>
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href='https://linkedin.com/in/jpaulvalen'>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Splash
