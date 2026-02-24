import styled from "styled-components";

type KpiCardProps = {
  title: string;
  value: string;
  trend?: string;
  positive?: boolean;
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 140px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  }\n`;

const Title = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const Trend = styled.span<{ $positive?: boolean }>`
  font-size: 0.9rem;
  font-weight: 600;

  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.state.success : theme.colors.state.error};
`;

export const KpiCard = ({ title, value, trend, positive }: KpiCardProps) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Value>{value}</Value>
      <Trend $positive={positive}>{trend}</Trend>
    </Card>
  );
};
