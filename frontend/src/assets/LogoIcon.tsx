import styled from "styled-components";

const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Cube = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary.main} 0%,
    #4361ee 100%
  );
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);

  &::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    top: -4px;
    right: -4px;
  }
`;

const InnerBar = styled.div`
  width: 4px;
  height: 12px;
  background: white;
  border-radius: 2px;
  position: absolute;
  left: 10px;
  bottom: 8px;
`;

const InnerDot = styled.div`
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: 18px;
  top: 8px;
`;

export const LogoIcon = () => (
  <IconContainer>
    <Cube>
      <InnerBar />
      <InnerDot />
    </Cube>
  </IconContainer>
);
