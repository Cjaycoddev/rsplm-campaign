"use client";
import { memo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { STATE_DATA } from "@/lib/analytics";

const data = STATE_DATA.map((s) => ({
  name: s.short,
  full: s.full,
  voters: s.voters,
  supporters: s.supporters,
}));

function StateBarChartBase() {
  return (
    <div className="h-[420px] w-full sm:h-[480px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#0E6B2F10" />
          <XAxis
            type="number"
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: "#11141866" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={64}
            tick={{ fontSize: 12, fill: "#11141899", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "#C9A22710" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #0E6B2F20",
              fontSize: 13,
              boxShadow: "0 8px 24px -8px rgba(11,93,42,0.2)",
            }}
            formatter={(v: number, n: string) => [v.toLocaleString(), n === "supporters" ? "Supporters" : "Registered Voters"]}
            labelFormatter={(label) => data.find((d) => d.name === label)?.full ?? label}
          />
          <Bar dataKey="supporters" radius={[0, 8, 8, 0]} maxBarSize={22}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === 0 ? "#C9A227" : "#0E6B2F"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(StateBarChartBase);