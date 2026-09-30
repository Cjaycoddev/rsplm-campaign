"use client";
import { memo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ENGAGEMENT } from "@/lib/analytics";

function EngagementDonutBase() {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <div className="h-[220px] w-[220px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ENGAGEMENT as any}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={92}
              paddingAngle={3}
              stroke="none"
            >
              {ENGAGEMENT.map((e) => (
                <Cell key={e.name} fill={e.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #0E6B2F20",
                fontSize: 13,
              }}
              formatter={(v: number) => v.toLocaleString()}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="w-full space-y-2 sm:w-auto">
        {ENGAGEMENT.map((e) => {
          const pct = ((e.value / 6000250) * 100).toFixed(0);
          return (
            <li key={e.name} className="flex items-center gap-3 text-sm">
              <span className="h-3 w-3 flex-shrink-0 rounded-full" style={{ background: e.color }} />
              <span className="flex-1 font-medium text-ink/80">{e.name}</span>
              <span className="font-display font-bold text-green-deep">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(EngagementDonutBase);