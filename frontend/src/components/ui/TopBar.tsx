import styled from "styled-components";
import { LogoIcon } from "../../assets/LogoIcon";

const StyledTopBar = styled.div`
  height: 90px;
  background: ${({ theme }) => theme.colors.background.surface};
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  letter-spacing: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const TopBar = () => {
  return (
    <StyledTopBar>
      <LogoIcon />
      <Title>InsightIQ</Title>
    </StyledTopBar>
  );
};
