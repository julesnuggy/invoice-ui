import React, { useState } from 'react';
import styles from '../styles/CreateInvoice.module.scss';
import { InvoiceLineItemType } from '../Pages/CreateInvoice';

type InvoiceLineItemProps = {
  invoiceNumber: number;
  onChange: (index: number, invoiceLineItem: InvoiceLineItemType) => void;
}

const InvoiceLineItem = ({invoiceNumber, onChange}: InvoiceLineItemProps) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const handleItemChange = (e: any) => {
    setItem(e.target.value);
    onChange(invoiceNumber, {item, quantity, price, subTotal});
  };

  const handlePriceChange = (e: any) => {
    const input = Number(e.target.value);
    const newPrice = Number(input.toFixed(2));
    setPrice(newPrice);
    setSubTotal(newPrice * quantity);
    onChange(invoiceNumber, {item, quantity, price, subTotal});
  };

  const handleQuantityChange = (e: any) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    setSubTotal(price * newQuantity);
    onChange(invoiceNumber, {item, quantity, price, subTotal});
  };

  return (
    <div className={styles.invoiceLineItem}>
      <div className={styles.invoiceLineItemDetail}>
        <label>Item</label>
        <input onChange={handleItemChange} />
      </div>
      <div className={styles.invoiceLineItemDetail}>
        <label>Price</label>
        <span>$<input onChange={handlePriceChange} /></span>
      </div>
      <div className={styles.invoiceLineItemDetail}>
        <label>Quantity</label>
        <input onChange={handleQuantityChange} />
      </div>
      <div className={styles.invoiceLineItemDetail}>
        <label>Sub-total</label>
        <div className={styles.subTotal}>${subTotal.toFixed(2)}</div>
      </div>
    </div>
  )
};

export default InvoiceLineItem;