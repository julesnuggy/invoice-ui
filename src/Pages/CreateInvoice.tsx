import React, { useState } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays'

import styles from '../styles/CreateInvoice.module.scss';
import InvoiceLineItem from '../components/InvoiceLineItem';

export type InvoiceLineItemType = {
  item: string,
  quantity: number,
  price: number,
  subTotal: number
}

const defaultLineItem = {
  item: '',
  quantity: 0,
  price: 0,
  subTotal: 0
};

const CreateInvoice = () => {
  const [customer, setCustomer] = useState('');
  const [invoiceLineItems, setInvoiceLineItems] = useState<InvoiceLineItemType[]>([]);

  const handleAddLineItem = (index: number, invoiceLineItem: InvoiceLineItemType) => {
    const temp = invoiceLineItems;
    temp[index] = invoiceLineItem;
    setInvoiceLineItems(temp);
  };

  const handleSubmit = () => {
    const invoice = {
      merchant: 'Merchant',
      customer: customer,
      invoiceLineItems
    };

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
      body: JSON.stringify(invoice)
    })
      .then(res => {
        return new Promise<string>((resolve) => resolve(res.text()));
      })
      .then(res => console.log(res))
  };

  return <>
    <Form
      onSubmit={handleSubmit}
      mutators={{...arrayMutators}}
      render={({handleSubmit, form}) => {
        return (
          <form onSubmit={handleSubmit} className={styles.createInvoiceForm}>
            <div className={styles.invoiceDetails}>
              <div className={styles.invoiceLineItemDetail}>
                <label>Merchant</label>
                <div>Merchant Name</div>
              </div>
              <div className={styles.invoiceLineItemDetail}>
                <label>Customer</label>
                <input onChange={e => setCustomer(e.target.value)} />
              </div>
            </div>
            <FieldArray name="InvoiceLineItems">
              {({ fields }) => fields.map((field, index) => <InvoiceLineItem key={index} onChange={handleAddLineItem} invoiceNumber={index} />)}
            </FieldArray>
            <div
              className={styles.addLineButton}
              onClick={() => form.mutators.push('InvoiceLineItems', defaultLineItem)}>
              Add Line Item
            </div>
            <button>Submit</button>
          </form>
        )
      }}
    />
  </>
};

export default CreateInvoice;