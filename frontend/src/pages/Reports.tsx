import { Table, Tag, Button, Select, DatePicker } from "antd";
import styled from "styled-components";
import PageContainer from "../components/layout/PageContainer";
import { DashboardSection } from "../components/common/DashboardSection";

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
`;

const data = [
  {
    key: "1",
    name: "Sales Report",
    created: "12 Feb 2026",
    status: "Completed",
  },
  {
    key: "2",
    name: "User Growth",
    created: "10 Feb 2026",
    status: "Processing",
  },
  {
    key: "3",
    name: "Revenue Report",
    created: "08 Feb 2026",
    status: "Failed",
  },
];

export const Reports = () => {
  const columns = [
    {
      title: "Report Name",
      dataIndex: "name",
    },
    {
      title: "Created On",
      dataIndex: "created",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const color =
          status === "Completed"
            ? "green"
            : status === "Processing"
              ? "blue"
              : "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      render: () => <Button type="link">Download</Button>,
    },
  ];

  return (
    <PageContainer>
      <DashboardSection title="Reports">
        <Filters>
          <RangePicker />
          <Select
            defaultValue="All"
            options={[
              { value: "All", label: "All Reports" },
              { value: "Sales", label: "Sales" },
              { value: "Users", label: "Users" },
            ]}
          />
          <Button type="primary">Generate Report</Button>
        </Filters>
      </DashboardSection>

      <CardGrid>
        <Card>
          <CardTitle>Total Reports</CardTitle>
          <CardValue>24</CardValue>
        </Card>

        <Card>
          <CardTitle>Completed</CardTitle>
          <CardValue>18</CardValue>
        </Card>

        <Card>
          <CardTitle>Processing</CardTitle>
          <CardValue>4</CardValue>
        </Card>

        <Card>
          <CardTitle>Failed</CardTitle>
          <CardValue>2</CardValue>
        </Card>
      </CardGrid>

      <StyledTable columns={columns} dataSource={data} pagination={false} />
    </PageContainer>
  );
};
