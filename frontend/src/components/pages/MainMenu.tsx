import '../../stylesheets/pages/MainMenu.css'

import { faCommentAlt, faComments, faEnvelopeOpen, faInbox } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particles from 'react-tsparticles'
import React from 'react'
import particlesOptions from '../../particles.json'
import { useHistory } from 'react-router-dom'

function MainMenu() {
  const history = useHistory()
  
  return (
    <div className='menu-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='menu-box'>
        <div className='menu-header'>
          <FontAwesomeIcon icon={faComments} />
          &nbsp;
          Banter
        </div>
        <div className='menu-item' onClick={() => history.push('/inbox')}>
          <FontAwesomeIcon icon={faInbox} />
          &nbsp;
          Inbox
        </div>
        <div className='menu-item' onClick={() => history.push('/outbox')}>
          <FontAwesomeIcon icon={faEnvelopeOpen} />
          &nbsp;
          Outbox
        </div>
        <div className='menu-item' onClick={() => history.push('/compose')}>
          <FontAwesomeIcon icon={faCommentAlt} />
          &nbsp;
          Compose
        </div>
      </div>
    </div>
  );
}

export default MainMenu
