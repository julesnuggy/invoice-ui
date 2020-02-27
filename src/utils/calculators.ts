import {InvoiceLineItemType} from '../models/Invoice';

export const calculateItemTotal = (price: number, quantity: number) => Number((price * quantity).toFixed(2));
export const calculateInvoiceTotal = (invoiceLineItems: InvoiceLineItemType[]) => invoiceLineItems.reduce((a,b) => ({...a, total: a.total + b.total})).total;
