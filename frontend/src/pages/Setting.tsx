import { Switch, Input, Button, Divider } from "antd";
import styled from "styled-components";
import PageContainer from "../components/layout/PageContainer";
import { useThemeContext } from "../context/ThemeContext";
import { DashboardSection } from "../components/common/DashboardSection";

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin: ${({ theme }) => theme.spacing.sm} 0 0 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  background: ${({ theme }) => theme.colors.background.elevated};
`;

const CardTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.3px;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 13px;
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const SettingLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SettingTitle = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 15px;
  margin: 0;
  display: block;
`;

const SettingDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 13px;
  margin: 0;
`;

const SettingControl = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  input,
  .ant-input {
    background-color: ${({ theme }) => theme.colors.background.default};
    border-color: ${({ theme }) => theme.colors.border.default};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 14px;
    padding: 8px 12px;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary.main};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
      box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.1) !important;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  button {
    font-weight: 500;
  }
`;

export const Settings = () => {
  const { mode, toggleTheme } = useThemeContext();

  const handleThemeChange = () => {
    toggleTheme();
  };
  return (
    <PageContainer>
      <DashboardSection title="Settings">
        <PageSubtitle>Manage your account and preferences</PageSubtitle>
      </DashboardSection>

      <SettingsGrid>
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardBody>
            <SettingItem>
              <SettingLabel>
                <SettingTitle>Full Name</SettingTitle>
                <SettingDescription>Your display name</SettingDescription>
              </SettingLabel>
              <SettingControl>
                <Input
                  placeholder="Enter your full name"
                  defaultValue="Sheefu"
                  style={{ width: "280px" }}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <SettingTitle>Email Address</SettingTitle>
                <SettingDescription>Your contact email</SettingDescription>
              </SettingLabel>
              <SettingControl>
                <Input
                  placeholder="Enter your email"
                  defaultValue="sheefu@example.com"
                  type="email"
                  style={{ width: "280px" }}
                />
              </SettingControl>
            </SettingItem>

            <ButtonGroup style={{ marginTop: "0" }}>
              <Button type="primary" size="large">
                Save Changes
              </Button>
              <Button>Cancel</Button>
            </ButtonGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardBody>
            <SettingItem>
              <SettingLabel>
                <SettingTitle>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                </SettingTitle>
                <SettingDescription>
                  Switch between light and dark themes
                </SettingDescription>
              </SettingLabel>
              <SettingControl>
                <Switch onChange={handleThemeChange} />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <SettingTitle>Compact Mode</SettingTitle>
                <SettingDescription>
                  Use compact layout with reduced spacing
                </SettingDescription>
              </SettingLabel>
              <SettingControl>
                <Switch />
              </SettingControl>
            </SettingItem>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Control how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardBody>
            <SettingItem>
              <SettingLabel>
                <SettingTitle>Email Notifications</SettingTitle>
                <SettingDescription>
                  Receive updates via email
                </SettingDescription>
              </SettingLabel>
              <SettingControl>
                <Switch defaultChecked />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <SettingTitle>Push Notifications</SettingTitle>
                <SettingDescription>
                  Receive browser push notifications
                </SettingDescription>
              </SettingLabel>
              <SettingControl>
                <Switch />
              </SettingControl>
            </SettingItem>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardBody>
            <SettingItem>
              <SettingLabel>
                <SettingTitle>Password</SettingTitle>
                <SettingDescription>
                  Change your account password
                </SettingDescription>
              </SettingLabel>
              <SettingControl>
                <Button>Update Password</Button>
              </SettingControl>
            </SettingItem>

            <Divider style={{ margin: "16px 0" }} />

            <SettingItem>
              <SettingLabel>
                <SettingTitle>Two-Factor Authentication</SettingTitle>
                <SettingDescription>
                  Add an extra layer of security
                </SettingDescription>
              </SettingLabel>
              <SettingControl>
                <Switch />
              </SettingControl>
            </SettingItem>
          </CardBody>
        </Card>
      </SettingsGrid>
    </PageContainer>
  );
};
