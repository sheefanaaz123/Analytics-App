// import { Switch } from "antd";
// import { useThemeContext } from "../../context/ThemeContext";
import styled from "styled-components";

const StyledTopBar = styled.div`
  height: 64px;
  background: ${({ theme }) => theme.colors.background.surface};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

// const ThemeToggle = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `;

export const TopBar = () => {
  // const { toggleTheme } = useThemeContext();

  // const changeTheme = () => {
  //   toggleTheme();
  // };

  return (
    <StyledTopBar>
      <Title>Dashboard</Title>
      {/* <ThemeToggle>
        <span>Theme</span>
        <Switch onChange={changeTheme} />
      </ThemeToggle> */}
    </StyledTopBar>
  );
};
