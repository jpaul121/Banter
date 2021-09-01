import '../../stylesheets/pages/MessageList.css'

import AppContext from '../other/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particles from 'react-tsparticles'
import React from 'react'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import particlesOptions from '../../particles.json'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

function MessageList() {
  const { messageData } = useContext(AppContext)

  const history = useHistory()
  
  return (
    <div className='view-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='list-box'>
        <div className='list-header'>
          <FontAwesomeIcon icon={faInbox} />
          &nbsp;
          Inbox
        </div>
        <div className='message-list'>
          {
            messageData.map(message => {
              const timestamp = new Date(message['timestamp'])
              return (
                <div className='message-item' key={message['message_id']} onClick={() => history.push(`/messages/${message['message_id']}`)}>
                  <p className='message-title'>{`${message['title']}`}</p>
                  <p className='message-timestamp'>{`${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()}`}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default MessageList
