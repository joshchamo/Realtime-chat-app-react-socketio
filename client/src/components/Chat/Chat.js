import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
/* when connection is made, set socket to io with endpoint 
   ('localhost:5000') */

/* queryString is used to retrieve data (name & room) from the URL 
   with useEffect lifecycle method. 
   location comes from React Router as a prop which is the URL, queryString can parse that string and return {name,room} through destructuring */

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // const socket = io({ ENDPOINT: ['websocket'] });

    const socket = io('localhost:5000', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });

    setName(name);
    setRoom(room);

    console.log(name, room);
    console.log(socket);
    /*the callback(error) is accesible through the index.js server callback */
    socket.emit('join test', { name, room }, () => {});

    /* return for unmounting, emit the 'diconnect' event, which is what I called it on the server side index.js */
    return () => {
      socket.emit('disconnect test');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    const socket = io('localhost:5000', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  /* returning [ENDPOINT, location.search above will only return a new connection when those two values have changed] */

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === 'Enter' ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
};

export default Chat;
