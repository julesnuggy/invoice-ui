import React, {useState} from 'react';
import styles from '../styles/CreateInvoice.module.scss';

type InvoiceLineItemProps = {
  invoiceNumber: number;
  invoiceUuid: string;
  onItemChange: (e:any, index: number) => void;
  onPriceChange: (e:any, index: number) => void;
  onQuantityChange: (e:any, index: number) => void;
  getItemTotal: (index: number) => number;
}

const InvoiceLineItem = ({invoiceNumber, invoiceUuid, onItemChange, onPriceChange, onQuantityChange, getItemTotal}: InvoiceLineItemProps) => {
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
          setItemTotal(getItemTotal(invoiceNumber));
        }} /></span>
      </div>
      <div className={styles.invoiceLineItemDetail}>
        <label>Quantity</label>
        <input onChange={e => {
          onQuantityChange(e, invoiceNumber);
          setItemTotal(getItemTotal(invoiceNumber));
        }} />
      </div>
      <div className={styles.invoiceLineItemDetail}>
        <label>Sub-Total</label>
        <div className={styles.total}>${itemTotal}</div>
      </div>
    </div>
  )
};

export default InvoiceLineItem;