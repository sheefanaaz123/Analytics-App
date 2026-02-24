import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";

const { Sider } = Layout;

const StyledSider = styled(Sider)<{ $bg: string; $border: string }>`
  left: 0;
  top: 0;
  bottom: 0;
  background: ${({ $bg }) => $bg} !important;
  border-right: 1px solid ${({ $border }) => $border};
  height: 100vh;
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

  .ant-menu-item {
    color: ${({ theme }) => theme.colors.text.secondary} !important;

    .anticon {
      color: ${({ theme }) => theme.colors.text.secondary} !important;
      transition: color 0.3s;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary.main} !important;
      background-color: ${({ theme }) =>
        theme.colors.background.elevated} !important;

      .anticon {
        color: ${({ theme }) => theme.colors.primary.main} !important;
      }
    }
  }

  .ant-menu-item-selected {
    background-color: ${({ theme }) =>
      theme.name === "dark"
        ? "rgba(67, 97, 238, 0.15)"
        : theme.colors.background.elevated} !important;

    color: ${({ theme }) => theme.colors.primary.main} !important;
    font-weight: 600;

    .anticon {
      color: ${({ theme }) => theme.colors.primary.main} !important;
    }
  }
`;

const Logo = styled.div<{ collapsed: boolean }>`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: ${({ collapsed }) => (collapsed ? "16px" : "20px")};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  letter-spacing: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const BottomMenu = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  return (
    <StyledSider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={260}
      $bg={theme.colors.background.surface}
      $border={theme.colors.border.default}
    >
      <Logo collapsed={collapsed}>AI DASH</Logo>

      <StyledMenu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "/analytics",
            icon: <BarChartOutlined />,
            label: "Analytics",
          },
          {
            key: "/reports",
            icon: <FileTextOutlined />,
            label: "Reports",
          },
        ]}
      />

      <BottomMenu>
        <StyledMenu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/settings",
              icon: <SettingOutlined />,
              label: "Settings",
            },
          ]}
        />
      </BottomMenu>
    </StyledSider>
  );
};
