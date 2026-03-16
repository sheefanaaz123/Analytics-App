import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";

const { Sider } = Layout;

const StyledSider = styled(Sider)<{ $bg: string; $border: string }>`
  background: ${({ $bg }) => $bg} !important;
  border-right: 1px solid ${({ $border }) => $border};
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ant-layout-sider-trigger {
    background: ${({ $bg }) => $bg} !important;
    svg {
      color: ${({ theme }) => theme.colors.text.secondary} !important;
    }
  }
`;

const StyledMenu = styled(Menu)`
  background: transparent !important;
  border-inline-end: none !important;
  margin-top: 16px;

  .ant-menu-item {
    color: ${({ theme }) => theme.colors.text.secondary} !important;
    &:hover {
      color: ${({ theme }) => theme.colors.primary.main} !important;
    }
  }

  .ant-menu-item-selected {
    background-color: ${({ theme }) =>
      theme.name === "dark" ? "rgba(67, 97, 238, 0.1)" : "#f0f2ff"} !important;
    color: ${({ theme }) => theme.colors.primary.main} !important;
    font-weight: 600;
  }
`;

const BottomMenu = styled.div`
  margin-top: auto;
  padding-bottom: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { key: "/", icon: <DashboardOutlined />, label: "Overview" },
    { key: "/analytics", icon: <BarChartOutlined />, label: "Analytics" },
    { key: "/reports", icon: <FileTextOutlined />, label: "Reports" },
    { key: "/insights", icon: <InsightsOutlined />, label: "Smart Insights " },
  ];

  return (
    <StyledSider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={260}
      $bg={theme.colors.background.surface}
      $border={theme.colors.border.default}
    >
      <StyledMenu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
      />

      <BottomMenu>
        <StyledMenu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
          ]}
        />
      </BottomMenu>
    </StyledSider>
  );
};
