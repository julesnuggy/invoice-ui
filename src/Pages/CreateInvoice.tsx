import React, { useState } from 'react';
import styles from '../styles/CreateInvoice.module.scss';

const CreateInvoice = () => {
  const [customer, setCustomer] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const handleItemPriceChange = (e: any) => {
    const input = Number(e.target.value);
    const newPrice = Number(input.toFixed(2));
    setPrice(newPrice);
    setSubTotal(newPrice * quantity);
  };

  const handleItemQuantityChange = (e: any) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    setSubTotal(price * newQuantity);
  };

  const handleSubmit = () => {
    const data = {customer, item, quantity, price, subTotal};

    fetch('http://localhost:9000/invoice', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data)
    })
      .then(res => {
        return new Promise<string>((resolve) => resolve(res.text()));
      })
      .then(res => console.log(res))
  };

  return <>
    <form onSubmit={handleSubmit} className={styles.createInvoiceForm}>
      <div className={styles.invoiceLineItem}>
        <div className={styles.invoiceLineItemDetail}>
          <label>Merchant</label>
          <div>Merchant Name</div>
        </div>
        <div className={styles.invoiceLineItemDetail}>
          <label>Customer</label>
          <input onChange={e => setCustomer(e.target.value)} />
        </div>
        <div className={styles.invoiceLineItemDetail}>
          <label>Item</label>
          <input onChange={e => setItem(e.target.value)} />
        </div>
        <div className={styles.invoiceLineItemDetail}>
          <label>Price</label>
          <span>$<input onChange={handleItemPriceChange} /></span>
        </div>
        <div className={styles.invoiceLineItemDetail}>
          <label>Quantity</label>
          <input onChange={handleItemQuantityChange} />
        </div>
        <div className={styles.invoiceLineItemDetail}>
          <label>Sub-total</label>
          <div className={styles.subTotal}>${subTotal.toFixed(2)}</div>
        </div>
      </div>
      <button>Submit</button>
    </form>
  </>
};

export default CreateInvoice;