"use client";

import { PieChart } from "@mui/x-charts/PieChart";

export default function Pie({
  data,
}: {
  data: { value: number; label: string }[];
}) {
  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 30,
          cornerRadius: 5,
        },
      ]}
    />
  );
}
