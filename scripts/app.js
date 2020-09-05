import { ExpenseTracker } from './expense-tracker.js';

export const expenseTracker = new ExpenseTracker(window);

expenseTracker.init(
  [
    { id: 1, name: 'Orange Market Fuel' },
    { id: 2, name: 'Oakmill Paper Supply' },
    { id: 3, name: "Tom's Computers" },
    { id: 4, name: 'Zip Ship' },
  ],
  [
    { id: 1, name: 'Equipment' },
    { id: 2, name: 'Shipping' },
    { id: 3, name: 'Travel' },
    { id: 4, name: 'Office Supplies' },
    { id: 5, name: 'Accounting' },
  ],
  [
    {
      id: 1,
      transactionDate: new Date('09/01/2020'),
      vendorId: 1,
      categoryId: 3,
      price: 23.45,
      description: 'Fuel for delivery truck.',
    },
    {
      id: 2,
      transactionDate: new Date('09/02/2020'),
      vendorId: 2,
      categoryId: 4,
      price: 67.12,
      description: 'Printer paper.',
    },
  ],
);
