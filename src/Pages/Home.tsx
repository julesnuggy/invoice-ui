import React, { useEffect, useState } from 'react';
import '../App.css';
import {Link} from "react-router-dom";

const Home = () => {
  const [ apiResponse, setApiResponse ] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/')
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => console.log(err));
  });

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
    </>
  );
};

export default Home;
