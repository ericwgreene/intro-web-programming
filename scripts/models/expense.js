export class Expense {
  get id() {
    return this._expenseData.id;
  }

  get transactionDate() {
    // format the transaction date to the locale
    return this._expenseData.transactionDate.toLocaleDateString();
  }

  get description() {
    return this._expenseData.description;
  }

  get vendorName() {
    // search the array of vendors for the vendor id and return the vendor name
    const vendor = this._expenseTracker.vendors.find(
      // this a predicate function, the first time it returns true,
      // that is the item from the array returned from the find function
      (v) => v.id === this._expenseData.vendorId,
    );

    // no item found, return a default name
    if (vendor === null) {
      return 'Unknown';
    }

    return vendor.name;
  }

  get categoryName() {
    // search the array of categories for the category id and return the category name
    const category = this._expenseTracker.categories.find(
      // this a predicate function, the first time it returns true,
      // that is the item from the array returned from the find function
      (c) => c.id === this._expenseData.categoryId,
    );

    // no item found, return a default name
    if (category === null) {
      return 'Unknown';
    }

    return category.name;
  }

  get price() {
    return this._expenseData.price;
  }

  get formattedPrice() {
    // format the price for USD using the Internationalization API
    return this._currencyFormat.format(this._expenseData.price);
  }

  constructor(expenseTracker, expenseData) {
    this._expenseTracker = expenseTracker;
    this._expenseData = expenseData;

    // using the typeof operator, the type of the transactionDate property is check
    // if the date is passed as a string, then convert it to a Date object
    if (typeof this._expenseData.transactionDate === 'string') {
      this._expenseData.transactionDate = new Date(this._expenseData.transactionDate);
    }

    // create a USD current formatter
    this._currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  }

  toJSON() {
    // return the raw expense data, used for serialization to local storage
    return this._expenseData;
  }
}
