import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css'; 

const Join = () => {
  /* 'name' is the current state, setName is the function to pass our 'name' state, and we pass an empty string to useState as initial value of 'name */
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h2 className="heading">Join</h2>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            /* when user types (event) we capture with event.tagrte.value, and apply 
            that data to setName */
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>

        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="button">
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
