import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';

import {InvoiceType} from '../models/Invoice';

import styles from '../styles/MerchantDashboard.module.scss';

const MerchantDashboard = () => {
  const [ merchantInvoices, setMerchantInvoices ] = useState<InvoiceType[]>([]);

  useEffect(() => {
    fetch('http://localhost:9000/merchant-dashboard/8ae83265-9b13-429a-abca-af9d695d169f')
      .then(res => res.text())
      .then(res => {
        const invoices = JSON.parse(res);
        if(!isEqual(merchantInvoices, invoices)) {
          setMerchantInvoices(invoices);
        }
      })
      .catch(err => console.log(err));
  });

  return (
    <>
      <div>Merchant Dashboard</div>
      <div className={styles.dashboardToolbar}>
        <Link to="/create-invoice">
          <button>Create New Invoice</button>
        </Link>
        <div>Current Balance: $100.00</div>
        <div>
          <label>Top Up Balance</label>
          <input className={styles.topUpInput} />
          <button type="submit">Submit</button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <td>Merchant</td>
              <td>Customer</td>
              <td>Sub Total</td>
              <td>Discount</td>
              <td>Grand Total</td>
              <td>Status</td>
            </tr>
          </thead>
          {merchantInvoices && merchantInvoices.map((inv: InvoiceType, index: number) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{inv.merchant_id}</td>
                  <td>{inv.customer_id}</td>
                  <td>{inv.subtotal}</td>
                  <td>{inv.discount}</td>
                  <td>{inv.grandTotal}</td>
                  <td>{inv.status}</td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </>
  );
};

export default MerchantDashboard;
