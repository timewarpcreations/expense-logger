let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(date, description, amount) {
  expenses.push({ date, description, amount });
  saveExpenses();
  displayExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  displayExpenses();
}

function displayExpenses() {
  const table = document.getElementById("expensesTableBody");
  table.innerHTML = "";
  let total = 0;
  expenses.forEach((e, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${e.date}</td>
      <td>${e.description}</td>
      <td>$${e.amount}</td>
      <td><button onclick="deleteExpense(${i})">Delete</button></td>
    `;
    table.appendChild(row);
    total += parseFloat(e.amount);
  });
  document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}

document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const desc = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  if (date && desc && amount) {
    addExpense(date, desc, amount);
    this.reset();
  }
});

document.addEventListener("DOMContentLoaded", displayExpenses);
