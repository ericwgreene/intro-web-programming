import { expenseTracker } from './app.js';

function renderLookupDropDown(selectElementSelector, lookupItems = []) {
  // lots of query selector code in plain JavaScript to interact
  // with DOM objects directly
  const selectElement = document.querySelector(selectElementSelector);

  // remove existing options
  while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.lastChild);
  }

  // appends the option DOM objects to the select DOM object
  selectElement.append(
    // create a new array with the 'Select One' option prepended to the front
    // [{ id: '', name: 'Select One...' }, ...lookupItems]

    // maps the array of items to an array of option DOM elements
    // [{ id: '', name: 'Select One...' }, ...lookupItems].map(/* omitted */)

    // spread the mapped option DOM elements as individual arguments into
    // the 'selectElement.append' function
    // selectElement.append(
    //   ...[{ id: '', name: 'Select One...' }, ...lookupItems].map(/* omitted */),
    // )

    ...[{ id: '', name: 'Select One...' }, ...lookupItems].map((lookupItem) => {
      const option = document.createElement('option');
      option.value = lookupItem.id;
      option.textContent = lookupItem.name;
      return option;
    }),
  );
}

function appendExpense() {
  // with plain JavaScript, code must be written to explicitly find
  // form control elements so that their collected values can
  // be retrieved and stored in JavaScript objects
  const expenseFormData = {
    transactionDate: document.querySelector('#date-input').value,
    vendorId: Number(document.querySelector('#vendor-select').value),
    categoryId: Number(document.querySelector('#category-select').value),
    description: document.querySelector('#description-textarea').value,
    price: document.querySelector('#price-input').value,
  };

  // persists the new expense data to local storage
  expenseTracker.addExpense(expenseFormData);

  // redirect to the expenses table
  window.location.href = '/expenses.html';
}

// replace the options in the dropdowns with the desired values
renderLookupDropDown('#vendor-select', expenseTracker.vendors);
renderLookupDropDown('#category-select', expenseTracker.categories);

// event listeners are wired up directly through the DOM API
document.querySelector('#add-expense-button').addEventListener('click', appendExpense);
