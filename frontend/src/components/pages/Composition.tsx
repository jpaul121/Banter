import '../../stylesheets/pages/Composition.css'

import { useContext, useState } from 'react'

import AppContext from '../other/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particles from 'react-tsparticles'
import React from 'react'
import { axiosInstance } from '../../axiosAPI'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import particlesOptions from '../../particles.json'
import { useHistory } from 'react-router-dom'

function Composition() {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ recipient, setRecipient ] = useState('')

  const { user } = useContext(AppContext)

  const history = useHistory()

  function sendMessage(e) {
    e.preventDefault()
    console.log(user)
    axiosInstance.post(
      `/api/messages/`, {
        title,
        content,
        sender: user,
        recipient,
      }
    )
  }
  
  return (
    <div className='compose-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='compose-box'>
        <div className='compose-header' onClick={() => history.push('/menu')}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
          &nbsp;
          Return
        </div>
        <div className='compose-form'>
          <input id='recipient' type='text' placeholder='Recipient' onChange={e => setRecipient(e.target.value)} />
          <input id='title' type='text' placeholder='Subject' onChange={e => setTitle(e.target.value)} />
          <input id='content' type='text' placeholder='Message' onChange={e => setContent(e.target.value)} />
          <div className='submit-row'>
            <button
              className='submit-button'
              onClick={e => sendMessage(e)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Composition
