"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "August", desktop: 127, mobile: 12 },
  { month: "September", desktop: 200, mobile: 40 },
  { month: "October", desktop: 151, mobile: 13 },
  { month: "November", desktop: 137, mobile: 16 },
  { month: "December", desktop: 91, mobile: 21 },
  { month: "January", desktop: 52, mobile: 7 },
];

const chartConfig = {
  desktop: {
    label: "Approved",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Denied",
    color: "hsl(var(--chart-1))",
  },
};

export default function Component() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="#5A6ACF" radius={2} />
            <Bar dataKey="mobile" fill="#E6E8EC" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
