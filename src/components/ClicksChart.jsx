import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ClicksChart({ links }) {
  if (!links.length) return null;

  const data = [...links]
    .sort((a, b) => b.click_count - a.click_count)
    .slice(0, 10)
    .map((l) => ({ code: l.code, clicks: l.click_count }));

  return (
    <div className="card" style={{ height: 260 }}>
      <h3>Clics por enlace (top 10)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c2f38" />
          <XAxis dataKey="code" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" allowDecimals={false} />
          <Tooltip contentStyle={{ background: "#171a21", border: "1px solid #2c2f38" }} />
          <Bar dataKey="clicks" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
