import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';

import '../App.css';

const Home = () => {
  const [ logIn, setLogIn ] = useState(false);
  const [ name, setName] = useState('');
  const [ type, setType] = useState('');

  const onGetAllClick = () => {
    fetch('http://localhost:9000/users')
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
      {logIn ? <Redirect to="/users/login"/> : null}
      <div>
        <div>Welcome to Aerarium</div>
        <button onClick={() => setLogIn(true)}>Log In</button>
        <a href="/users/login">LOGIN????</a>
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
