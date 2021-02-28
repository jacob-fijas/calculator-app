import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import Calculator from './Calculator'
import History from './History'

const App = () => {
  const [history, setHistory] = useState([])
  const ws = useRef(null)

  // call API to get history 
  async function getHistory() {
    const { data } = await axios.get('/api/history')
    setHistory(data)
  }

  useEffect(() => {
    // get current history on mount
    getHistory()

    // connect to web socket
    ws.current = io()
    ws.current.on('connect', () => console.log('ws connected'))
    ws.current.on('disconnect', () => console.log('ws closed'))
    ws.current.on('message', (data) => setHistory(data))

    return () => ws.current.close()
  }, [])

  return (
    <div style={{ textAlign: 'center', display: 'inline-block', height: '100vh' }}>
      <div className='container'>
        <Calculator />
        <History history={history} />
      </div>
    </div>
  )
}

export default App