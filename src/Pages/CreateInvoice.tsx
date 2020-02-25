import React, { useState } from 'react';

const CreateInvoice = () => {
  const [customer, setCustomer] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = () => {
    const data = {customer, item, quantity, price};
    console.log(data);
    console.log(JSON.stringify(data));
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
    <form onSubmit={handleSubmit}>
      <label>Merchant</label>
      <div>Merchant Name</div>

      <label>Customer</label>
      <input onChange={e => setCustomer(e.target.value)} />

      <label>Item</label>
      <input onChange={e => setItem(e.target.value)} />

      <label>Price</label>
      <input onChange={e => setPrice(Number(e.target.value))} />

      <label>Quantity</label>
      <input onChange={e => setQuantity(Number(e.target.value))} />

      <label>Sub-total</label>
      <div>Calculate Sub-Total</div>

      <button>Submit</button>
    </form>
  </>
};

export default CreateInvoice;