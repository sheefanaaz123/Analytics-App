/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Button, Select, DatePicker, message } from "antd";
import styled from "styled-components";
import PageContainer from "../components/layout/PageContainer";
import { DashboardSection } from "../components/common/DashboardSection";
import { useMemo, useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const Filters = styled.div`
  display: flex;
  gap: 12px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const CardTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CardValue = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 22px;
  font-weight: 600;
`;

const StyledTable = styled(Table)`
  .ant-table {
    background: ${({ theme }) => theme.colors.background.surface};
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.strong};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: ${({ theme }) => theme.colors.border.default} !important;
  }
  .ant-table-tbody > tr:hover > td {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Reports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [category, setCategory] = useState("All");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/reports")
      .then((res) => res.json())
      .then(setReports)
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  const filteredData = useMemo(() => {
    return reports.filter((item) => {
      const matchesCategory = category === "All" || item.type === category;

      let matchesDate = true;
      if (dateRange && dateRange[0] && dateRange[1]) {
        const start = dateRange[0].startOf("day");
        const end = dateRange[1].endOf("day");
        const itemDate = dayjs(item.created);

        matchesDate = !itemDate.isBefore(start) && !itemDate.isAfter(end);
      }

      return matchesCategory && matchesDate;
    });
  }, [reports, category, dateRange]);

  const stats = {
    total: filteredData.length,
    completed: filteredData.filter((r) => r.status === "Completed").length,
    processing: filteredData.filter((r) => r.status === "Processing").length,
    failed: filteredData.filter((r) => r.status === "Failed").length,
  };

  const handleGenerate = () => {
    const newReport = {
      key: Date.now().toString(),
      name: `New ${category !== "All" ? category : "General"} Report`,
      created: dayjs().format("YYYY-MM-DD"),
      status: "Processing",
      type: category === "All" ? "Sales" : category,
    };
    setReports([newReport, ...reports]);
    message.success("Report generation started!");
  };

  const columns = [
    { title: "Report Name", dataIndex: "name" },
    {
      title: "Created On",
      dataIndex: "created",
      render: (date: string) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const colors: Record<string, string> = {
          Completed: "green",
          Processing: "blue",
          Failed: "red",
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      render: () => (
        <Button type="link" onClick={() => message.info("Downloading...")}>
          Download
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <DashboardSection title="Reports">
        <Filters>
          <RangePicker onChange={(values) => setDateRange(values)} />
          <Select
            defaultValue="All"
            onChange={(value) => setCategory(value)}
            options={[
              { value: "All", label: "All Reports" },
              { value: "Sales", label: "Sales" },
              { value: "Users", label: "Users" },
            ]}
          />
          <Button type="primary" onClick={handleGenerate}>
            Generate Report
          </Button>
        </Filters>
      </DashboardSection>

      <CardGrid>
        <Card>
          <CardTitle>Total</CardTitle>
          <CardValue>{stats.total}</CardValue>
        </Card>
        <Card>
          <CardTitle>Completed</CardTitle>
          <CardValue>{stats.completed}</CardValue>
        </Card>
        <Card>
          <CardTitle>Processing</CardTitle>
          <CardValue>{stats.processing}</CardValue>
        </Card>
        <Card>
          <CardTitle>Failed</CardTitle>
          <CardValue>{stats.failed}</CardValue>
        </Card>
      </CardGrid>

      <StyledTable
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
    </PageContainer>
  );
};
