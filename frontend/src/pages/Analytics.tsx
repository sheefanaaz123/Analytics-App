import ReactECharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";
import { useMemo, useRef, useEffect, useState } from "react";
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

export const Analytics = () => {
  const theme = useTheme();
  const revenueRef = useRef<ReactECharts>(null);
  const trafficRef = useRef<ReactECharts>(null);

  const [kpis, setKpis] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any>({
    months: [],
    revenue: [],
    ad_spend: [],
  });
  const [trafficData, setTrafficData] = useState<any[]>([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      revenueRef.current?.getEchartsInstance().resize();
      trafficRef.current?.getEchartsInstance().resize();
    });
    const containers = document.querySelectorAll(".echarts-for-react");
    containers.forEach((container) => resizeObserver.observe(container));
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/analytics/kpis")
      .then((res) => res.json())
      .then(setKpis)
      .catch(console.error);

    fetch("http://127.0.0.1:5000/api/analytics/revenue")
      .then((res) => res.json())
      .then(setRevenueData)
      .catch(console.error);

    fetch("http://127.0.0.1:5000/api/analytics/traffic")
      .then((res) => res.json())
      .then(setTrafficData)
      .catch(console.error);
  }, []);

  const revenueOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      legend: { textStyle: { color: theme.colors.text.secondary } },
      grid: { left: "8%", right: "8%", bottom: "10%", containLabel: true },
      xAxis: {
        type: "category",
        name: "Month",
        nameTextStyle: { color: theme.colors.text.secondary },
        data: revenueData.months,
        axisLine: { lineStyle: { color: theme.colors.text.secondary } },
        axisLabel: { color: theme.colors.text.secondary },
      },
      yAxis: {
        type: "value",
        name: "Amount (USD)",
        nameTextStyle: { color: theme.colors.text.secondary },
        splitLine: { lineStyle: { color: theme.colors.border.default } },
        axisLabel: {
          color: theme.colors.text.secondary,
          formatter: "${value}",
        },
      },
      series: [
        {
          name: "Revenue",
          data: revenueData.revenue,
          type: "bar",
          barWidth: "30%",
          itemStyle: {
            color: theme.colors.primary.main,
            borderRadius: [6, 6, 0, 0],
          },
        },
        {
          name: "Ad Spend",
          data: revenueData.ad_spend,
          type: "line",
          smooth: true,
          lineStyle: { width: 3 },
        },
      ],
    }),
    [theme, revenueData],
  );

  const trafficOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: { trigger: "item", formatter: "{b}<br/>{c} sessions ({d}%)" },
      legend: {
        bottom: "0%",
        textStyle: { color: theme.colors.text.secondary },
        itemWidth: 12,
        itemHeight: 12,
      },
      series: [
        {
          name: "Traffic Sources",
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "45%"],
          avoidLabelOverlap: true,
          label: {
            show: true,
            formatter: "{b}\n{d}%",
            color: theme.colors.text.primary,
          },
          data: trafficData,
        },
      ],
    }),
    [theme, trafficData],
  );

  return (
    <PageContainer>
      <DashboardSection title="Analytics">
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
              opts={{ renderer: "canvas" }}
            />
          </ChartCard>
          <ChartCard>
            <ReactECharts
              ref={trafficRef}
              option={trafficOption}
              style={{ height: "100%", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </ChartCard>
        </TwoColumnGrid>
      </DashboardSection>
    </PageContainer>
  );
};
