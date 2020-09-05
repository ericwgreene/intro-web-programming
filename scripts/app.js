import { ExpenseTracker } from './expense-tracker.js';

// - create an instance of the ExpenseTracker which will be used
//   in all of the JavaScript files
// - an instance is created on page load and the same instance is used
//   within all JavaScript file which import it
export const expenseTracker = new ExpenseTracker(window);

// - initialize the Expense Tracker with initial data for
//   vendors, categories, and expenses
// - this data is only used if there is no data previously
//   initialized within the local storage
// - local storage is used to maintain state between page
//   loads
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
