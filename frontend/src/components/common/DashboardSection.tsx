import styled from "styled-components";

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  margin: 0;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const DashboardSection = ({ title, children }: Props) => {
  return (
    <SectionWrapper>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </SectionWrapper>
  );
};
