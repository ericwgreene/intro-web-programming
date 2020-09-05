import { expenseTracker } from './app.js';

function renderLookupDropDown(selectElementSelector, lookupItems = []) {
  const selectElement = document.querySelector(selectElementSelector);

  while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.lastChild);
  }

  selectElement.append(
    ...[{ id: '', name: 'Select One...' }, ...lookupItems].map((lookupItem) => {
      const option = document.createElement('option');
      option.value = lookupItem.id;
      option.textContent = lookupItem.name;
      return option;
    }),
  );
}

function appendExpense() {
  const expenseFormData = {
    transactionDate: document.querySelector('#date-input').value,
    vendorId: Number(document.querySelector('#vendor-select').value),
    categoryId: Number(document.querySelector('#category-select').value),
    description: document.querySelector('#description-textarea').value,
    price: document.querySelector('#price-input').value,
  };
  expenseTracker.addExpense(expenseFormData);

  window.location.href = '/expenses.html';
}

renderLookupDropDown('#vendor-select', expenseTracker.vendors);
renderLookupDropDown('#category-select', expenseTracker.categories);

document.querySelector('#add-expense-button').addEventListener('click', appendExpense);
