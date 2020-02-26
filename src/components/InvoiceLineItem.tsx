import React, {useState} from 'react';
import styles from '../styles/CreateInvoice.module.scss';

type InvoiceLineItemProps = {
  invoiceNumber: number;
  onItemChange: (e:any, index: number) => void;
  onPriceChange: (e:any, index: number) => void;
  onQuantityChange: (e:any, index: number) => void;
  getSubTotal: (index: number) => number;
}

const InvoiceLineItem = ({invoiceNumber, onItemChange, onPriceChange, onQuantityChange, getSubTotal}: InvoiceLineItemProps) => {
  const [itemTotal, setItemTotal] = useState(0);

  return (
    <div className={styles.invoiceLineItem}>
      <div className={styles.invoiceLineItemDetail}>
        <label>Item</label>
        <input onChange={e => onItemChange(e, invoiceNumber)} />
      </div>
      <div className={styles.invoiceLineItemDetail}>
        <label>Price</label>
        <span>$<input onChange={e => {
          onPriceChange(e, invoiceNumber);
          setItemTotal(getSubTotal(invoiceNumber));
        }} /></span>
      </div>
      <div className={styles.invoiceLineItemDetail}>
        <label>Quantity</label>
        <input onChange={e => {
          onQuantityChange(e, invoiceNumber);
          setItemTotal(getSubTotal(invoiceNumber));
        }} />
      </div>
      <div className={styles.invoiceLineItemDetail}>
        <label>Sub-Total</label>
        <div className={styles.subTotal}>${itemTotal}</div>
      </div>
    </div>
  )
};

export default InvoiceLineItem;