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
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 44 + 40}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
            <XAxis type="number" tickFormatter={v => `$${v}`} />
            <YAxis type="category" dataKey="category" width={100} />
            <Tooltip formatter={v => `$${v.toFixed(2)}`} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
            <Bar dataKey="total" name="Spent" fill="#3b6ea5" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default SpendingChart
