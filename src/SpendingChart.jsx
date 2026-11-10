import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function SpendingChart({ transactions }) {
  const totals = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount
    })

  const data = Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)

  return (
    <div className="spending-chart">
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p>No expenses yet. Add one to see where your money goes.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 44 + 40}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
            <XAxis type="number" tickFormatter={v => `$${v}`} stroke="#a9bcd0" tick={{ fill: '#4d5a6e', fontSize: 12 }} />
            <YAxis type="category" dataKey="category" width={96} stroke="#a9bcd0" tick={{ fill: '#1b2433', fontSize: 13 }} />
            <Tooltip formatter={v => `$${v.toFixed(2)}`} cursor={{ fill: 'rgba(27,36,51,0.06)' }} />
            <Bar dataKey="total" name="Spent" fill="#b3261e" barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default SpendingChart
