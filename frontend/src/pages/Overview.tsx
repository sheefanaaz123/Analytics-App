/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactECharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";
import { useMemo, useRef, useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import { KpiCard } from "../components/ui/KpiCard";
import { DashboardSection } from "../components/common/DashboardSection";
import CardGrid from "../components/common/CardGrid";
import { TwoColumnGrid } from "../components/common/TwoGridColumn";
import { VITE_BACKEND_URL } from "../constants";

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

  const [kpis, setKpis] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any | null>(null);
  const [usersGrowthData, setUsersGrowthData] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/overview/kpis`)
      .then((res) => res.json())
      .then(setKpis)
      .catch((err) => console.error("Error fetching KPIs:", err));

    fetch(`${VITE_BACKEND_URL}/api/overview/revenue`)
      .then((res) => res.json())
      .then(setRevenueData)
      .catch((err) => console.error("Error fetching revenue data:", err));

    fetch(`${VITE_BACKEND_URL}/api/overview/users-growth`)
      .then((res) => res.json())
      .then(setUsersGrowthData)
      .catch((err) => console.error("Error fetching users growth data:", err));
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      revenueRef.current?.getEchartsInstance().resize();
      userGrowthRef.current?.getEchartsInstance().resize();
    });
    document
      .querySelectorAll(".echarts-for-react")
      .forEach((el) => resizeObserver.observe(el));
    return () => resizeObserver.disconnect();
  }, []);

  const revenueOption = useMemo(() => {
    if (!revenueData) return {};
    return {
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      grid: { left: "8%", right: "8%", bottom: "10%", containLabel: true },
      xAxis: {
        type: "category",
        name: "Month",
        data: revenueData.months,
        axisLine: { lineStyle: { color: theme.colors.text.secondary } },
        axisLabel: { color: theme.colors.text.secondary },
      },
      yAxis: {
        type: "value",
        name: "Revenue (USD)",
        splitLine: { lineStyle: { color: theme.colors.border.default } },
        axisLabel: { color: theme.colors.text.secondary },
      },
      series: [
        {
          name: "Revenue (2025)",
          data: revenueData.data2025,
          type: "line",
          smooth: true,
        },
        {
          name: "Revenue (2024)",
          data: revenueData.data2024,
          type: "line",
          smooth: true,
          lineStyle: { type: "dashed" },
        },
      ],
    };
  }, [revenueData, theme]);

  const usersGrowthOption = useMemo(() => {
    if (!usersGrowthData) return {};
    return {
      backgroundColor: "transparent",
      grid: { left: "8%", right: "13%", bottom: "10%", containLabel: true },
      xAxis: {
        type: "category",
        name: "Month",
        data: usersGrowthData.months,
        axisLine: { lineStyle: { color: theme.colors.text.secondary } },
        axisLabel: { color: theme.colors.text.secondary },
      },
      yAxis: {
        type: "value",
        name: "Active Users",
        axisLabel: { color: theme.colors.text.secondary },
        splitLine: { lineStyle: { color: theme.colors.border.default } },
      },
      series: [
        {
          name: "Active Users",
          type: "bar",
          data: usersGrowthData.data,
          barWidth: "50%",
          itemStyle: {
            color: theme.colors.primary.light,
            borderRadius: [6, 6, 0, 0],
          },
        },
      ],
      tooltip: { trigger: "axis", formatter: "{b}<br/>Users: {c}" },
    };
  }, [usersGrowthData, theme]);

  return (
    <PageContainer>
      <DashboardSection title="Overview">
        <CardGrid>
          {kpis.map((item) => (
            <KpiCard key={item.title} {...item} />
          ))}
        </CardGrid>

        <TwoColumnGrid>
          <ChartCard>
            <ReactECharts
              ref={revenueRef}
              option={revenueOption}
              style={{ height: "100%", width: "100%" }}
            />
          </ChartCard>

          <ChartCard>
            <ReactECharts
              ref={userGrowthRef}
              option={usersGrowthOption}
              style={{ height: "100%", width: "100%" }}
            />
          </ChartCard>
        </TwoColumnGrid>
      </DashboardSection>
    </PageContainer>
  );
};

export default Overview;
