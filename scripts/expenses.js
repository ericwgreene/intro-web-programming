import { expenseTracker } from './app.js';

// create a new td element, with the 'col-date' class applied
function createDateCol(dateValue) {
  const dateTdElement = document.createElement('td');
  dateTdElement.classList.add('col-date');
  dateTdElement.textContent = dateValue;
  return dateTdElement;
}

// create a new td element, with the 'col-number' class applied
function createNumCol(numValue) {
  const numTdElement = document.createElement('td');
  numTdElement.classList.add('col-number');
  numTdElement.textContent = numValue;
  return numTdElement;
}

// create a new td element, with the 'align-center' class applied
function createCenterCol(content) {
  const centerTdElement = document.createElement('td');
  centerTdElement.classList.add('align-center');
  centerTdElement.append(content);
  return centerTdElement;
}

function createButton(content, clickFn) {
  const viewButtonElement = document.createElement('button');
  viewButtonElement.textContent = content;
  viewButtonElement.addEventListener('click', clickFn);
  return viewButtonElement;
}

function renderExpenseRow(expense) {
  const trElement = document.createElement('tr');
  trElement.append(createDateCol(expense.transactionDate));
  trElement.append(createCenterCol(expense.vendorName));
  trElement.append(createCenterCol(expense.categoryName));
  trElement.append(createNumCol(expense.formattedPrice));
  trElement.append(createCenterCol(createButton('View', () => renderExpenseDetails(expense))));
  return trElement;
}

function renderExpenseRows(expenses = []) {
  const tbodyElement = document.querySelector('#expenses-table > tbody');

  // clear all rows
  while (tbodyElement.firstChild) {
    tbodyElement.removeChild(tbodyElement.lastChild);
  }

  //
  tbodyElement.append(
    ...(expenses.length === 0
      ? ['<tr><td colspan="5">There are no expenses.</td></tr>']
      : expenses.map(renderExpenseRow)),
  );
}

function renderUpdateExpenseTotal(expensesFormattedTotal) {
  const td = document.querySelector('#expenses-table > tfoot td:nth-child(2)');
  td.textContent = expensesFormattedTotal;
}

function renderExpenseDetails(expense) {
  document.querySelector('.expense-date > span:last-child').textContent = expense.transactionDate;
  document.querySelector('.expense-vendor > span:last-child').textContent = expense.vendorName;
  document.querySelector('.expense-category > span:last-child').textContent = expense.categoryName;
  document.querySelector('.expense-description > span:last-child').textContent =
    expense.description;
  document.querySelector('.expense-amount > span:last-child').textContent = expense.formattedPrice;
}

renderExpenseRows(expenseTracker.expenses);
renderUpdateExpenseTotal(expenseTracker.expensesFormattedTotal);
