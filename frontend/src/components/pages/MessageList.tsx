import AppContext from '../other/AppContext';
import React from 'react'
import { useContext } from 'react';

function MessageList() {
  const { messageData } = useContext(AppContext)
  
  return (
    <div className='view-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='list-box'>
        <div className='list-header'>
          <FontAwesomeIcon icon={faComments} />
          &nbsp;
          Banter
        </div>
        <div className='message-list'>
          {
            messageData.map(message => {
              return (
                <div className='message-item'>
                  <p>{message['title']}</p>
                  <p>{new Date(message['timestamp'])}</p>
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
