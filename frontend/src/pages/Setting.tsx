import { useState } from "react";
import { Switch, Input, Button, Form, message, Card } from "antd";
import styled from "styled-components";
import PageContainer from "../components/layout/PageContainer";
import { useThemeContext } from "../context/ThemeContext";
import { DashboardSection } from "../components/common/DashboardSection";

interface ProfileFormValues {
  fullName: string;
  email: string;
}

const SettingsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 90px;
  width: 100%;
`;

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background.surface} !important;
  border: 1px solid ${({ theme }) => theme.colors.border.default} !important;
  border-radius: 12px !important;
  overflow: hidden;

  .ant-card-head {
    background: ${({ theme }) => theme.colors.background.elevated};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
    padding: 0 24px;
  }

  .ant-card-head-title {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 18px;
    font-weight: 600;
  }

  .ant-card-body {
    padding: 0;
  }

  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colors.text.primary} !important;
    font-weight: 500;
  }
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  }
`;

const LabelArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 500;
    font-size: 15px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 13px;
  }
`;

const ActionArea = styled.div`
  display: flex;
  align-items: center;
`;

interface ProfileFormValues {
  fullName: string;
  email: string;
}

export const Settings = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [notifs, setNotifs] = useState({
    email: true,
    push: false,
    twoFactor: false,
  });

  const handleSaveProfile = async (values: ProfileFormValues) => {
    setLoading(true);
    const hide = message.loading("Updating profile...", 0);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Final Submission:", { ...values, ...notifs });

      message.success("Profile updated successfully");
      setIsDirty(false);
    } catch (error) {
      message.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      hide();
      setLoading(false);
    }
  };

  const handleToggle = (key: keyof typeof notifs) => (checked: boolean) => {
    setNotifs((prev) => ({ ...prev, [key]: checked }));
    message.info(
      `${key.charAt(0).toUpperCase() + key.slice(1)} setting updated`,
    );
  };

  return (
    <PageContainer>
      <DashboardSection title="">
        <SettingsGrid>
          <StyledCard title="Profile Information">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                fullName: "Sheefa Naaz",
                email: "sheefa.naaz@example.com",
              }}
              onFinish={handleSaveProfile}
              onValuesChange={() => setIsDirty(true)}
              style={{ padding: "24px" }}
            >
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  size="large"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!isDirty}
              >
                Save Changes
              </Button>
            </Form>
          </StyledCard>

          <StyledCard title="Appearance">
            <SettingItem>
              <LabelArea>
                <h4>Dark Mode</h4>
                <p>Switch between light and dark themes</p>
              </LabelArea>
              <ActionArea>
                <Switch checked={mode === "dark"} onChange={toggleTheme} />
              </ActionArea>
            </SettingItem>
          </StyledCard>

          <StyledCard title="Notifications">
            <SettingItem>
              <LabelArea>
                <h4>Email Notifications</h4>
                <p>Receive weekly analytics reports via email</p>
              </LabelArea>
              <ActionArea>
                <Switch
                  checked={notifs.email}
                  onChange={handleToggle("email")}
                />
              </ActionArea>
            </SettingItem>

            <SettingItem>
              <LabelArea>
                <h4>Push Notifications</h4>
                <p>Receive alerts about failed reports directly in browser</p>
              </LabelArea>
              <ActionArea>
                <Switch checked={notifs.push} onChange={handleToggle("push")} />
              </ActionArea>
            </SettingItem>
          </StyledCard>

          <StyledCard title="Security">
            <SettingItem>
              <LabelArea>
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
              </LabelArea>
              <ActionArea>
                <Switch
                  checked={notifs.twoFactor}
                  onChange={handleToggle("twoFactor")}
                />
              </ActionArea>
            </SettingItem>
            <div style={{ padding: "20px 24px" }}>
              <Button
                onClick={() => message.info("Redirecting to password reset...")}
              >
                Update Password
              </Button>
            </div>
          </StyledCard>
        </SettingsGrid>
      </DashboardSection>
    </PageContainer>
  );
};
