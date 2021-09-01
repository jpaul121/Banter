import '../../stylesheets/pages/MessageView.css'

import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particles from 'react-tsparticles'
import { axiosInstance } from '../../axiosAPI'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import particlesOptions from '../../particles.json'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { withRouter } from 'react-router'

function MessageView(props) {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ sender, setSender ] = useState('')

  const history = useHistory()

  function getMessage() {
    axiosInstance.get(
      `/api/messages/${props.match.params.message_id}`
    )
    .then(response => {
      setTitle(response.data.title)
      setContent(response.data.content)
      setSender(response.data.sender)
    })
  }

  useEffect(() => {
    getMessage()
  }, [ props.match.params.message_id ])
  
  return (
    <div className='view-container'>
      <Particles id='tsparticles' options={particlesOptions} />
      <div className='view-box'>
        <div className='view-header' onClick={() => history.push('/menu')}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
          &nbsp;
          Return
        </div>
        <div className='message-content'>
          <p>{`From: ${sender}`}</p>
          <p>{`Subject: ${title}`}</p>
          <p id='message-proper'>{`${content}`}</p>
        </div>
      </div>
    </div>
  );
}

const finishedMessageView = withRouter(MessageView)

export default finishedMessageView
