import React, {useEffect, useState} from "react";
import { socket } from '../services/socket';


export default function Form() {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [send, setSend] = useState('Envie uma mensagem');

  
    function onSubmit(event) {
      event.preventDefault();
      setIsLoading(true);
      
      if(socket.connected) {
        socket.timeout(100).emit('receive-message', value, () => {
            setIsLoading(false);
            setValue('');
            setSend("Mensagem enviada!")
          });

        let xablau = setTimeout(ChangeSend, 4000);
        console.log(xablau)

      } else {
        setSend("Conexão deu xablau");
      }
    }

    function ChangeSend() {
        setSend("Envie uma mensagem");
    }

    return (
      <form onSubmit={ onSubmit }>
        <input onChange={ e => setValue(e.target.value) } value={value} />
        <button type="submit" disabled={ isLoading }>Submit</button>
        <p>{send}</p>
        
      </form>
    );
}