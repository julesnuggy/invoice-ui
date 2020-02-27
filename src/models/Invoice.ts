export type InvoiceType = {
  id: string,
  merchant_id: string,
  customer_id: string,
  subtotal: number,
  discount: number,
  grandTotal: number,
  status: string
}

export type InvoiceRequest = {
  invoiceUuid: string,
  merchant: string,
  customer: string,
  subtotal: number,
  discount: number,
  grandTotal: number,
  status: string,
  invoiceLineItems: InvoiceLineItemType[]
}

export type InvoiceLineItemType = {
  invoiceUuid: string,
  item: string,
  quantity: number,
  price: number,
  total: number
}

export enum InvoiceLineItemEnum {
  ITEM = 'item',
  QUANTITY = 'quantity',
  PRICE = 'price',
  TOTAL = 'total'
}

export const createDefaultLineItem = (invoiceUuid: string) => ({
  invoiceUuid,
  item: '',
  quantity: 0,
  price: 0,
  total: 0
});


