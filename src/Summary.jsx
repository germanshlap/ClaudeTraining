function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <section className="summary" aria-label="Summary">
      <div className="summary-balance">
        <h3>Balance</h3>
        <p className="balance-amount">${balance}</p>
      </div>
      <div className="summary-card">
        <h3>Income</h3>
        <p className="income-amount">${totalIncome}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses</h3>
        <p className="expense-amount">${totalExpenses}</p>
      </div>
    </section>
  );
}

export default Summary
