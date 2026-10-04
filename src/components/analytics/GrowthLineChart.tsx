"use client";
import { memo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { PROJECTION } from "@/lib/analytics";

const data = PROJECTION.map((p) => ({ ...p }));

function GrowthLineChartBase() {
  return (
    <div className="h-[260px] w-full sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0E6B2F" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#0E6B2F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#C9A227" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#C9A227" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0E6B2F10" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#11141866" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
            tick={{ fontSize: 11, fill: "#11141866" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <ReferenceLine
            x="Q3"
            stroke="#C9A227"
            strokeDasharray="4 4"
            label={{ value: "Today", position: "top", fontSize: 10, fill: "#C9A227", fontWeight: 700 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #0E6B2F20",
              fontSize: 13,
              boxShadow: "0 8px 24px -8px rgba(11,93,42,0.2)",
            }}
            formatter={(v, _n, ctx) => [
              Number(v ?? 0).toLocaleString(),
              (ctx as { payload?: { type?: string } })?.payload?.type === "projected"
                ? "Projected Supporters"
                : "Supporters",
            ]}
          />
          <Area
            type="monotone"
            dataKey="supporters"
            stroke="#0E6B2F"
            strokeWidth={2.5}
            fill="url(#actualGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink/60">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-deep" /> Actual
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Projected
        </span>
      </div>
    </div>
  );
}

export default memo(GrowthLineChartBase);