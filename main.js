const form = document.getElementById('expenseForm');
const list = document.getElementById('list');
const totalEl = document.getElementById('total');

function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses') || '[]');
}

function saveExpenses(arr) {
  localStorage.setItem('expenses', JSON.stringify(arr));
}

function render() {
  const expenses = getExpenses();
  list.innerHTML = '';
  let total = 0;
  expenses.forEach((e, idx) => {
    total += Number(e.amount);
    const li = document.createElement('li');
    li.textContent = `${e.desc} - ${e.category} - $${e.amount}`;
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => {
      expenses.splice(idx, 1);
      saveExpenses(expenses);
      render();
    };
    li.appendChild(del);
    list.appendChild(li);
  });
  totalEl.textContent = total.toFixed(2);
}

form.onsubmit = (ev) => {
  ev.preventDefault();
  const desc = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const expenses = getExpenses();
  expenses.push({desc, amount, category});
  saveExpenses(expenses);
  form.reset();
  render();
};

render();
