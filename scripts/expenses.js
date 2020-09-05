import { expenseTracker } from './app.js';

const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function renderExpenseRow(expense) {
  console.dir(expense.transactionDate);

  const trElement = document.createElement('tr');

  const transactionDateTdElement = document.createElement('td');
  transactionDateTdElement.textContent = expense.transactionDate;
  trElement.append(transactionDateTdElement);

  const vendorNameTdElement = document.createElement('td');
  vendorNameTdElement.textContent = expense.vendorName;
  trElement.append(vendorNameTdElement);

  const categoryNameTdElement = document.createElement('td');
  categoryNameTdElement.textContent = expense.categoryName;
  trElement.append(categoryNameTdElement);

  const priceTdElement = document.createElement('td');
  priceTdElement.textContent = expense.formattedPrice;
  trElement.append(priceTdElement);

  const actionsTdElement = document.createElement('td');
  const viewButtonElement = document.createElement('button');
  viewButtonElement.textContent = 'View';
  viewButtonElement.addEventListener('click', () => renderExpenseDetails(expense));
  actionsTdElement.append(viewButtonElement);
  trElement.append(actionsTdElement);

  return trElement;
}

function renderExpenseRows(expenses = []) {
  const tbodyElement = document.querySelector('#expenses-table > tbody');

  // clear all children
  while (tbodyElement.firstChild) {
    tbodyElement.removeChild(tbodyElement.lastChild);
  }

  tbodyElement.append(
    ...(expenses.length === 0
      ? ['<tr><td colspan="5">There are no expenses.</td></tr>']
      : expenses.map(renderExpenseRow)),
  );
}

function renderUpdateExpenseTotal(expenseTotal = 0) {
  const td = document.querySelector('#expenses-table > tfoot td:last-child');
  td.textContent = currencyFormat.format(expenseTotal);
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
renderUpdateExpenseTotal(expenseTracker.expenses.reduce((sum, exp) => sum + exp.price, 0));
