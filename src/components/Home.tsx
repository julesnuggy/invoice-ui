import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';

const Home = () => {
  const [ apiResponse, setApiResponse ] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/')
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => console.log(err));
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{apiResponse}</p>
      </header>
    </div>
  );
};

export default Home;
