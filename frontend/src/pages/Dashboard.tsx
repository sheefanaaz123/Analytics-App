import styled, { useTheme } from "styled-components";
import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

import { KpiCard } from "../components/ui/KpiCard";
import { DashboardSection } from "../components/common/DashboardSection";
import { TwoColumnGrid } from "../components/common/TwoGridColumn";
import { ChartCard } from "../components/ui/ChartCard";
import PageContainer from "../components/layout/PageContainer";

const ChartBox = styled.div`
  width: 100%;
  height: 320px;
`;

const kpiData = [
  { title: "Revenue", value: "$48,239", trend: "+12.4%", positive: true },
  { title: "Users", value: "1,245", trend: "+8.1%", positive: true },
  { title: "Orders", value: "320", trend: "-2.3%", positive: false },
  { title: "Conversion Rate", value: "2.4%", trend: "+0.6%", positive: true },
];

export default function Dashboard() {
  const theme = useTheme();

  const revenueOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },

      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLine: { lineStyle: { color: theme.colors.border.default } },
        axisLabel: { color: theme.colors.text.secondary },
      },

      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: {
          lineStyle: { color: theme.colors.border.default },
        },
        axisLabel: { color: theme.colors.text.secondary },
      },

      series: [
        {
          data: [1200, 2100, 1800, 2600, 3200, 4100, 3800],
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            width: 3,
            color: theme.colors.primary.main,
          },
          itemStyle: {
            color: theme.colors.primary.main,
          },
          areaStyle: {
            opacity: 0.15,
            color: theme.colors.primary.main,
          },
        },
      ],
    }),
    [theme],
  );

  const trafficOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: { trigger: "item" },

      legend: {
        bottom: 0,
        textStyle: { color: theme.colors.text.secondary },
      },

      series: [
        {
          type: "pie",
          radius: ["45%", "70%"],
          avoidLabelOverlap: false,

          label: { show: false },
          emphasis: { label: { show: false } },

          data: [
            { value: 1048, name: "Organic" },
            { value: 735, name: "Social" },
            { value: 580, name: "Referral" },
            { value: 484, name: "Ads" },
          ],
        },
      ],
    }),
    [theme],
  );

  return (
    <PageContainer>
      <DashboardSection title="Overview">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="Analytics">
        <TwoColumnGrid>
          <ChartCard title="Revenue Trend">
            <ChartBox>
              <ReactECharts option={revenueOption} style={{ height: "100%" }} />
            </ChartBox>
          </ChartCard>

          <ChartCard title="Traffic Sources">
            <ChartBox>
              <ReactECharts option={trafficOption} style={{ height: "100%" }} />
            </ChartBox>
          </ChartCard>
        </TwoColumnGrid>
      </DashboardSection>
    </PageContainer>
  );
}
