import React, { useState, useEffect } from 'react';
import { socket } from './services/socket';

import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log(`Conectado ao sevidor`)
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log(`Conexão com o servidor encerrada`)
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      
    };
  }, []);

  return (
    <div className='App'>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autocomplete="off" /><button>Send</button>
      </form>
    </div>
    
  )
}

export default App
