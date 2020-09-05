import { Expense } from './expense.js';

// - constant variables are used for variables whose
//   values do not change
// - uppercase syntax is a convention to view these as
//   constants
export const VENDORS_KEY = 'vendors';
export const CATEGORIES_KEY = 'categories';
export const EXPENSES_KEY = 'expenses';

export class ExpenseTracker {
  // getter/setter properties
  get vendors() {
    // square brackets can be used to execute an expression
    // which determines the name of a property to access
    // on an object
    return this._data[VENDORS_KEY].concat();
  }

  get categories() {
    return this._data[CATEGORIES_KEY].concat();
  }

  get expenses() {
    return this._data[EXPENSES_KEY].concat();
  }

  set expenses(value) {
    // validation logic can be applied within the setter methods for
    // getter/setter properties

    if (this._data[EXPENSES_KEY] === value) {
      throw new Error('expenses cannot be the same array reference');
    }

    if (!Array.isArray(this._data[EXPENSES_KEY])) {
      throw new Error('expenses must be an array');
    }

    this._data[EXPENSES_KEY] = value;
  }

  get expensesFormattedTotal() {
    return this._currencyFormat.format(
      this._data[EXPENSES_KEY].reduce((sum, exp) => sum + exp.price, 0),
    );
  }

  // constructor

  constructor(global) {
    // save a reference to the global variable
    this._global = global;
    this._data = {};
    this._currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  }

  // methods

  saveData(dataKey) {
    // write the data to local storage for future use
    this._global.localStorage.setItem(
      dataKey,
      // local storage stores data as a string
      JSON.stringify(
        typeof this._data[dataKey].toJSON === 'function'
          ? this._data[dataKey].toJSON()
          : this._data[dataKey],
      ),
    );
  }

  loadData(dataKey, initialData, ModelClass = null) {
    // attempt to load the data from local storage
    const dataJSON = this._global.localStorage.getItem(dataKey);

    if (dataJSON !== null) {
      // data was found, convert from JSON string to a JavaScript object
      this._data[dataKey] = JSON.parse(dataJSON).map(
        // if a ModelClass is specified use the ModelClass to create
        // the object, otherwise just use the plain object
        (data) => (ModelClass ? new ModelClass(this, data) : data),
      );
    } else {
      // data was not found, use the initial data
      this._data[dataKey] = initialData.map((data) =>
        ModelClass ? new ModelClass(this, data) : data,
      );

      // save data to local storage
      this.saveData(dataKey);
    }
  }

  init(vendors, categories, expenses = []) {
    this.loadData(VENDORS_KEY, vendors);
    this.loadData(CATEGORIES_KEY, categories);
    this.loadData(EXPENSES_KEY, expenses, Expense);
  }

  addExpense(expenseData) {
    // calculate the id from the existing expense ids
    expenseData.id = Math.max(...this.expenses.map((exp) => exp.id), 0) + 1;
    this.expenses = this.expenses.concat(new Expense(this, expenseData));
    this.saveData(EXPENSES_KEY);
  }
}
