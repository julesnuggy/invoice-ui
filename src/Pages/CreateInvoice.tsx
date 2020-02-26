import React, { useState } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays'

import styles from '../styles/CreateInvoice.module.scss';
import InvoiceLineItem from '../components/InvoiceLineItem';

enum InvoiceLineItemEnum {
  ITEM = 'item',
  QUANTITY = 'quantity',
  PRICE = 'price',
  SUBTOTAL = 'subTotal'
}

export type InvoiceLineItemType = {
  item: string,
  quantity: number,
  price: number,
  subTotal: number
}

const DEFAULT_LINE_ITEM = {
  item: '',
  quantity: 0,
  price: 0,
  subTotal: 0
};

const CreateInvoice = () => {
  const [customer, setCustomer] = useState('');
  const [invoiceLineItems, setInvoiceLineItems] = useState<InvoiceLineItemType[]>([]);

  const handleAmendLineItem = (index: number, key: InvoiceLineItemEnum, value: string | number) => {
    const temp: InvoiceLineItemType[] = invoiceLineItems;
    (temp[index][key] as any) = value;
    setInvoiceLineItems(temp);
  };

  const calculateSubTotal = (price: number, quantity: number) => Number((price * quantity).toFixed(2));

  const getSubTotal = (index: number) => invoiceLineItems[index][InvoiceLineItemEnum.SUBTOTAL];

  const handleItemChange = (e: any, index: number) => {
    handleAmendLineItem(index, InvoiceLineItemEnum.ITEM, e.target.value);
  };

  const handlePriceChange = (e: any, index: number) => {
    const input = Number(e.target.value);
    const newPrice = Number(input.toFixed(2));
    const quantity = invoiceLineItems[index][InvoiceLineItemEnum.QUANTITY];
    handleAmendLineItem(index, InvoiceLineItemEnum.PRICE, newPrice);
    handleAmendLineItem(index, InvoiceLineItemEnum.SUBTOTAL, calculateSubTotal(newPrice, quantity));
  };

  const handleQuantityChange = (e: any, index: number) => {
    const input = Number(e.target.value);
    const newQuantity = Number(input.toFixed());
    const price = invoiceLineItems[index][InvoiceLineItemEnum.PRICE];
    handleAmendLineItem(index, InvoiceLineItemEnum.QUANTITY, newQuantity);
    handleAmendLineItem(index, InvoiceLineItemEnum.SUBTOTAL, calculateSubTotal(price, newQuantity));
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
              {({ fields }) => fields.map((field, index) =>
                <InvoiceLineItem
                  key={index}
                  invoiceNumber={index}
                  onItemChange={handleItemChange}
                  onPriceChange={handlePriceChange}
                  onQuantityChange={handleQuantityChange}
                  getSubTotal={getSubTotal}
                />)}
            </FieldArray>
            <div
              className={styles.addLineButton}
              onClick={() => {
                setInvoiceLineItems(currentState => currentState.concat({...DEFAULT_LINE_ITEM}));
                form.mutators.push('InvoiceLineItems', DEFAULT_LINE_ITEM);
              }}>
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