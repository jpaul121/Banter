import '../../stylesheets/pages/Authentication.css'

import { faCommentAlt, faEnvelopeOpen, faInbox } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particles from 'react-tsparticles'
import React from 'react'
import particlesOptions from '../../particles.json'

function MainMenu() {
  return (
    <div className='menu-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='menu-box'>
        <div className='menu-item'>
          <FontAwesomeIcon icon={faInbox} />
          &nbsp;
          Inbox
        </div>
        <div className='menu-item'>
          <FontAwesomeIcon icon={faEnvelopeOpen} />
          &nbsp;
          Outbox
        </div>
        <div className='menu-item'>
          <FontAwesomeIcon icon={faCommentAlt} />
          &nbsp;
          Compose
        </div>
      </div>
    </div>
  );
}

export default MainMenu
