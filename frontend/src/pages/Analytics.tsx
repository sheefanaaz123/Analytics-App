import ReactECharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";
import PageContainer from "../components/layout/PageContainer";
import { KpiCard } from "../components/ui/KpiCard";
import { DashboardSection } from "../components/common/DashboardSection";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  height: 420px;
`;

export const Analytics = () => {
  const theme = useTheme();

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$82,430",
    },
    {
      title: "Active Users",
      value: "2,845",
    },
    {
      title: "Bounce Rate",
      value: "32.5%",
    },
    {
      title: "Session Duration",
      value: "3m 42s",
    },
  ];

  const revenueOption = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisLine: { lineStyle: { color: theme.colors.text.secondary } },
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: { color: theme.colors.border.default },
      },
    },
    series: [
      {
        data: [4000, 3000, 5000, 4780, 5890, 6390],
        type: "line",
        smooth: true,
        lineStyle: { width: 3, color: theme.colors.primary.main },
        areaStyle: {
          color: theme.colors.primary.main + "20",
        },
      },
    ],
  };

  const trafficOption = {
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          { value: 45, name: "Google" },
          { value: 25, name: "Direct" },
          { value: 20, name: "Social" },
          { value: 10, name: "Referral" },
        ],
        label: {
          color: theme.colors.text.primary,
        },
      },
    ],
  };

  return (
    <PageContainer>
      <DashboardSection title="Analytics">
        <CardGrid>
          {kpiData.map((item) => (
            <KpiCard key={item.title} {...item} />
          ))}
        </CardGrid>

        <ChartGrid>
          <ChartCard>
            <ReactECharts option={revenueOption} style={{ height: "100%" }} />
          </ChartCard>

          <ChartCard>
            <ReactECharts option={trafficOption} style={{ height: "100%" }} />
          </ChartCard>
        </ChartGrid>
      </DashboardSection>
    </PageContainer>
  );
};
