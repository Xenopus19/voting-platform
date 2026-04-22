import type { VoteFull } from "@/types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";

import { BarChart, CartesianGrid, YAxis, XAxis, Bar } from "recharts";

interface VoteChartPropsType {
  vote: VoteFull;
}

const VoteChart = ({ vote }: VoteChartPropsType) => {
  const options = vote.options;
  const data = options.map((o, index) => {
    return {
      option: o.text,
      votersAmount: o.votersAmount,
      fill: `var(--color-option_${index})`,
    };
  });
  const chartConfig = options.reduce(
    (acc, option, index) => {
      acc[`option_${index}`] = {
        label: option.text,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return acc;
    },
    {
      votersAmount: { label: "Votes", color: "#2563eb" },
    } as ChartConfig,
  );
  return (
    <ChartContainer config={chartConfig} className="mt-2 min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ left: 0 }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="option"
          type="category"
          width={150}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 12)}
        />
        <XAxis type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="votersAmount" radius={5} />
      </BarChart>
    </ChartContainer>
  );
};

export default VoteChart;
