import React, { useEffect, useState } from 'react';
import styles from '../styles/MerchantDashboard.module.scss';

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
      <div className={styles.dashboardToolbar}>
        <button>Create New Invoice</button>
        <div>Current Balance: £100.00</div>
        <div>
          <label>Top Up Balance</label>
          <input className={styles.topUpInput} />
          <button type="submit">Submit</button>
        </div>
      </div>
    </>
  );
};

export default MerchantDashboard;
