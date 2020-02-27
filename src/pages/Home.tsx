import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import '../App.css';

const Home = () => {
  const [ apiResponse, setApiResponse ] = useState('');
  const [ name, setName] = useState('');
  const [ type, setType] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/')
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => console.log(err));
  });

  const onGetAllClick = () => {
    fetch('http://localhost:9000/user')
      .then(res => res.text())
      .then(res => console.log(res))
  };

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleTypeChange = (e: any) => setType(e.target.value);

  const onCreateUserSubmit = () => {
    const newUser = {name, type, balance: 0};

    fetch('http://localhost:9000/user', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(newUser)
    })
      .then(res => {
        return new Promise<string>((resolve) => resolve(res.text()));
      })
      .then(res => console.log(JSON.parse(res)))
  };

  return (
    <>
      <div>
        <div>Welcome to Aerarium</div>
        <p>{apiResponse}</p>
      </div>
      <div>
        <Link to={"/merchant-dashboard"}>
          <button>Merchant Dashboard</button>
        </Link>
      </div>

      <div>
        <button onClick={onGetAllClick}>Get All Users</button>
      </div>

      <div>
        <h3>Create New User</h3>
        <form onSubmit={onCreateUserSubmit}>
          <label>Name</label>
          <input name="name" onChange={handleNameChange}/>
          <label>Type</label>
          <input name="type" onChange={handleTypeChange}/>
          <button>Create User</button>
        </form>
      </div>
    </>
  );
};

export default Home;
