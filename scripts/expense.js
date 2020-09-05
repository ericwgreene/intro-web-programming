export class Expense {
  constructor(expenseTracker, expenseData) {
    this._expenseTracker = expenseTracker;
    this._expenseData = expenseData;

    if (typeof this._expenseData.transactionDate === 'string') {
      this._expenseData.transactionDate = new Date(this._expenseData.transactionDate);
    }

    this._currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  }

  get id() {
    return this._expenseData.id;
  }

  get transactionDate() {
    return this._expenseData.transactionDate.toLocaleDateString();
  }

  get description() {
    return this._expenseData.description;
  }

  get vendorName() {
    const vendor = this._expenseTracker.vendors.find((v) => v.id === this._expenseData.vendorId);

    if (vendor === null) {
      return 'Unknown';
    }

    return vendor.name;
  }

  get categoryName() {
    const category = this._expenseTracker.categories.find(
      (c) => c.id === this._expenseData.categoryId,
    );

    if (category === null) {
      return 'Unknown';
    }

    return category.name;
  }

  get price() {
    return this._expenseData.price;
  }

  get formattedPrice() {
    return this._currencyFormat.format(this._expenseData.price);
  }

  toJSON() {
    return this._expenseData;
  }
}
