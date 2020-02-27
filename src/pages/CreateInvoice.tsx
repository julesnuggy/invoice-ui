import React, {useState} from 'react';
import {Redirect} from 'react-router';
import {Form} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {FieldArray} from 'react-final-form-arrays';
import {v4 as uuidv4} from 'uuid';

import InvoiceLineItem from '../components/InvoiceLineItem';
import {createDefaultLineItem, InvoiceLineItemEnum, InvoiceLineItemType, InvoiceRequest} from '../models/Invoice';

import styles from '../styles/CreateInvoice.module.scss';
import {calculateInvoiceTotal, calculateItemTotal} from '../utils/calculators';

const CreateInvoice = () => {
  const [customer, setCustomer] = useState('');
  const [invoiceLineItems, setInvoiceLineItems] = useState<InvoiceLineItemType[]>([]);
  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
  const [invoiceDiscount, setInvoiceDiscount] = useState(0);
  const [isFormSent, setIsFormSent] = useState(false);

  const invoiceUuid = invoiceLineItems[0]?.invoiceUuid || uuidv4();

  const handleAmendLineItem = (index: number, key: InvoiceLineItemEnum, value: string | number) => {
    const temp: InvoiceLineItemType[] = invoiceLineItems;
    (temp[index][key] as any) = value;
    setInvoiceLineItems(temp);
  };

  const handleItemChange = (e: any, index: number) => {
    handleAmendLineItem(index, InvoiceLineItemEnum.ITEM, e.target.value);
  };

  const handlePriceChange = (e: any, index: number) => {
    const input = Number(e.target.value);
    const newPrice = Number(input.toFixed(2));
    const quantity = invoiceLineItems[index][InvoiceLineItemEnum.QUANTITY];
    handleAmendLineItem(index, InvoiceLineItemEnum.PRICE, newPrice);
    handleAmendLineItem(index, InvoiceLineItemEnum.TOTAL, calculateItemTotal(newPrice, quantity));
    setInvoiceSubtotal(calculateInvoiceTotal(invoiceLineItems));
  };

  const handleQuantityChange = (e: any, index: number) => {
    const input = Number(e.target.value);
    const newQuantity = Number(input.toFixed());
    const price = invoiceLineItems[index][InvoiceLineItemEnum.PRICE];
    handleAmendLineItem(index, InvoiceLineItemEnum.QUANTITY, newQuantity);
    handleAmendLineItem(index, InvoiceLineItemEnum.TOTAL, calculateItemTotal(price, newQuantity));
    setInvoiceSubtotal(calculateInvoiceTotal(invoiceLineItems));
  };

  const handleDiscountChange = (e: any) => {
    const input = Number(e.target.value);
    const newDiscount = Number(input.toFixed(2));
    setInvoiceDiscount(newDiscount);
  };

  const getItemTotal = (index: number) => invoiceLineItems[index][InvoiceLineItemEnum.TOTAL];

  const handleSubmit = () => {
    const invoice: InvoiceRequest = {
      invoiceUuid,
      merchant: 'M',
      customer: customer,
      subtotal: invoiceSubtotal,
      discount: invoiceDiscount,
      grandTotal: invoiceSubtotal - invoiceDiscount,
      status: 'PENDING',
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
      .then(() => setIsFormSent(true))
  };

  return <>
    {isFormSent ? <Redirect to="/merchant-dashboard" /> : null}
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
                  invoiceUuid={invoiceUuid}
                  onItemChange={handleItemChange}
                  onPriceChange={handlePriceChange}
                  onQuantityChange={handleQuantityChange}
                  getItemTotal={getItemTotal}
                />)}
            </FieldArray>
            <div
              className={styles.addLineButton}
              onClick={() => {
                setInvoiceLineItems(currentState => currentState.concat({...createDefaultLineItem(invoiceUuid)}));
                form.mutators.push('InvoiceLineItems', createDefaultLineItem(invoiceUuid));
              }}>
              Add Line Item
            </div>
            {invoiceLineItems.length > 0 && (
              <div className={styles.invoicePriceSummary}>
                <div className={styles.summarySection}>
                  <label>Subtotal:</label>
                  <div>${invoiceSubtotal}</div>
                </div>
                <div className={styles.summarySection}>
                  <label>Discount:</label>
                  <span>$<input onChange={handleDiscountChange} placeholder="0" /></span>
                </div>
                <div className={styles.summarySection}>
                  <label>Grand Total:</label>
                  <div>${invoiceSubtotal - invoiceDiscount}</div>
                </div>
              </div>
            )}
            <button>Submit</button>
          </form>
        )
      }}
    />
  </>
};

export default CreateInvoice;