import React, { useState, useEffect } from 'react';
import { socket } from './services/socket';

import './App.css'
import Form from './components/Form';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from './components/Events';

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

    function onFooEvent(value) {
      setFooEvents(fooEvents.concat(value));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);
    

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
      
    };
  }, [fooEvents]);

  return (
    <div className="App">
      <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />
      <Form />
    </div>
    
  )
}

export default App
