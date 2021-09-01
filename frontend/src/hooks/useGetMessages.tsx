import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { axiosInstance } from '../axiosAPI'
import { useLocation } from 'react-router-dom'

function useGetMessages() {
  const [ messageData, setMessageData ] = useState([])
  
  const signal = axios.CancelToken.source()
  
  async function getMessages() {
    axiosInstance.get(
      `/api/messages/inbox`, {
        cancelToken: signal.token,
      }
    )
    .then(response => {
      console.log(`This is the response: `)
      console.log(response)
      setMessageData(response.data)
    })
  }

  useEffect(() => {
    getMessages()
  }, [])

  return messageData;
}

export default useGetMessages
