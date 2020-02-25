import React, { useEffect, useState } from 'react';
import '../App.css';

const MerchantDashboard = () => {
  const [ apiResponse, setApiResponse ] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/merchant-dashboard')
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => console.log(err));
  });

  return (
    <>
      <div>Merchant Dashboard</div>
      <p>{apiResponse}</p>
    </>
  );
};

export default MerchantDashboard;
