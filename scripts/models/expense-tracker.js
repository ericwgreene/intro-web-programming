import { Expense } from './expense.js';

export const VENDORS_KEY = 'vendors';
export const CATEGORIES_KEY = 'categories';
export const EXPENSES_KEY = 'expenses';

export class ExpenseTracker {
  // getter/setter properties

  get vendors() {
    return this._data[VENDORS_KEY].concat();
  }

  get categories() {
    return this._data[CATEGORIES_KEY].concat();
  }

  get expenses() {
    return this._data[EXPENSES_KEY].concat();
  }

  set expenses(value) {
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
    this._global = global;
    this._data = {};
    this._currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  }

  // methods

  saveData(dataKey) {
    // write the data to local storage for future use
    this._global.localStorage.setItem(
      dataKey,
      JSON.stringify(
        typeof this._data[dataKey].toJSON === 'function'
          ? this._data[dataKey].toJSON()
          : this._data[dataKey],
      ),
    );
  }

  loadData(dataKey, initialData, ModelClass = null) {
    // attempt toad the data from local storage
    const dataJSON = this._global.localStorage.getItem(dataKey);

    if (dataJSON !== null) {
      // data was found, setup on global variable
      this._data[dataKey] = JSON.parse(dataJSON).map((data) =>
        ModelClass ? new ModelClass(this, data) : data,
      );
    } else {
      // data was not found, use the initial data
      this._data[dataKey] = initialData;

      // save data to local storage
      this.saveData(dataKey);
    }
  }

  init(vendors, categories, expenses = []) {
    this.loadData(VENDORS_KEY, vendors);
    this.loadData(CATEGORIES_KEY, categories);
    this.loadData(
      EXPENSES_KEY,
      expenses.map((expense) => new Expense(this, expense)),
      Expense,
    );
  }

  addExpense(expenseData) {
    expenseData.id = Math.max(...this.expenses.map((exp) => exp.id), 0) + 1;
    this.expenses = this.expenses.concat(new Expense(this, expenseData));
    this.saveData(EXPENSES_KEY);
  }
}
