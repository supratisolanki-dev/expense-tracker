import { useState , useEffect } from 'react'

function App() {
  // 1. expenses
  // 2. expenseName
  // 3. expenseAmount
  const [expenses, setExpenses] = useState(
    () => {
      const saved = localStorage.getItem('expenses');
      return saved ? JSON.parse(saved) : [];
    }
  );
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');


  function handleAddExpense(){
    // console.log("Name:", expenseName, "Amount:",expenseAmount);
    if(expenseName.trim() === '' || expenseAmount.trim() === '') return;
    const newExpense = {
      id:Date.now(),
      name: expenseName,
      amount:Number(expenseAmount),
    };
    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setExpenseAmount('');

  }
  const total = expenses.reduce((sum, expense) => sum + expense.amount,0);

  useEffect(() => 
  localStorage.setItem('expenses', JSON.stringify(expenses))
  );
  function handleDeleteExpense(idToDelete){
    const updateExpenses = expenses.filter((expense) => expense.id !== idToDelete);
    setExpenses(updateExpenses);
  }
  return (
    <div>
     <h1>Expense Tracker</h1>
     <input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} placeholder='Expense Name'/>
     <input type="number" value={expenseAmount} onChange={(e) =>  setExpenseAmount(e.target.value)} placeholder='Expense Amount'/>
     <button onClick={handleAddExpense}>Add Expense</button>

      <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.name}  -  {expense.amount} Rupees 
          <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
        </li>
      ))}
      </ul>
      <h2>Total Amount: Rupees {total}</h2>
    </div>
  )
}

export default App
