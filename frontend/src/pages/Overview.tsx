import ReactECharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";
import { useMemo, useRef, useEffect } from "react";
import PageContainer from "../components/layout/PageContainer";
import { KpiCard } from "../components/ui/KpiCard";
import { DashboardSection } from "../components/common/DashboardSection";
import CardGrid from "../components/common/CardGrid";
import { TwoColumnGrid } from "../components/common/TwoGridColumn";

const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  height: 420px;

  min-width: 0;
  overflow: hidden;
  position: relative;
`;

const Overview = () => {
  const theme = useTheme();

  const revenueRef = useRef<ReactECharts>(null);
  const userGrowthRef = useRef<ReactECharts>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (revenueRef.current) revenueRef.current.getEchartsInstance().resize();
      if (userGrowthRef.current)
        userGrowthRef.current.getEchartsInstance().resize();
    });

    const containers = document.querySelectorAll(".echarts-for-react");
    containers.forEach((container) => resizeObserver.observe(container));

    return () => resizeObserver.disconnect();
  }, []);

  const kpiData = [
    {
      title: "Revenue (This Month)",
      value: "$30,000",
      trend: "+12% vs last month",
      positive: true,
    },
    {
      title: "New Customers",
      value: "712",
      trend: "+8% vs last month",
      positive: true,
    },
    {
      title: "Active Users",
      value: "5,482",
      trend: "+5% vs last month",
      positive: true,
    },
    {
      title: "Conversion Rate",
      value: "5.4%",
      trend: "-1.2% vs last month",
      positive: false,
    },
  ];
  const revenueOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      grid: {
        left: "8%",
        right: "8%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        name: "Month",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        axisLine: { lineStyle: { color: theme.colors.text.secondary } },
        axisLabel: { color: theme.colors.text.secondary },
      },
      yAxis: {
        type: "value",
        name: "Revenue (USD)",
        splitLine: {
          lineStyle: { color: theme.colors.border.default },
        },
        axisLabel: { color: theme.colors.text.secondary },
      },
      series: [
        {
          name: "Revenue (2025)",
          data: [4000, 3000, 5000, 4780, 5890, 6390],
          type: "line",
          smooth: true,
        },
        {
          name: "Revenue (2024)",
          data: [3500, 2800, 4200, 4500, 5200, 6000],
          type: "line",
          smooth: true,
          lineStyle: { type: "dashed" },
        },
      ],
    }),
    [theme],
  );

  const usersGrowthOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      grid: {
        left: "8%",
        right: "13%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        name: "Month",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        axisLine: { lineStyle: { color: theme.colors.text.secondary } },
        axisLabel: { color: theme.colors.text.secondary },
      },
      yAxis: {
        type: "value",
        name: "Active Users",
        axisLabel: { color: theme.colors.text.secondary },
        splitLine: {
          lineStyle: { color: theme.colors.border.default },
        },
      },
      series: [
        {
          name: "Active Users",
          type: "bar",
          data: [2200, 2800, 3400, 3900, 4700, 5482],
          barWidth: "50%",
          itemStyle: {
            color: theme.colors.primary.light,
            borderRadius: [6, 6, 0, 0],
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        formatter: "{b}<br/>Users: {c}",
      },
    }),
    [theme],
  );

  return (
    <PageContainer>
      <DashboardSection title="Overview">
        <CardGrid>
          {kpiData.map((item) => (
            <KpiCard key={item.title} {...item} />
          ))}
        </CardGrid>

        <TwoColumnGrid>
          <ChartCard>
            <ReactECharts
              ref={revenueRef}
              option={revenueOption}
              style={{ height: "100%", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </ChartCard>

          <ChartCard>
            <ReactECharts
              ref={userGrowthRef}
              option={usersGrowthOption}
              style={{ height: "100%", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </ChartCard>
        </TwoColumnGrid>
      </DashboardSection>
    </PageContainer>
  );
};

export default Overview;
