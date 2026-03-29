import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../assets/LoginPage.png";
import { VITE_BACKEND_URL } from "../constants";
import { message } from "antd";
import { authFetch } from "../utils/api";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  background: ${({ theme }) => theme.colors.background.default};
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  &:before {
    content: "";
    position: absolute;
    width: 1000px;
    height: 1000px;
    background: radial-gradient(
      circle,
      rgba(59, 130, 246, 0.25) 0%,
      rgba(59, 130, 246, 0) 70%
    );
    top: -200px;
    left: -200px;
    filter: blur(80px);
  }

  &:after {
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.2) 0%,
      rgba(99, 102, 241, 0) 70%
    );
    bottom: -150px;
    right: -150px;
    filter: blur(80px);
  }
`;

const LeftSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Illustration = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 900px;

  filter: drop-shadow(0 40px 80px rgba(0, 0, 0, 0.35));
`;

const LoginSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const RightSection = styled.div`
  width: 420px;
`;

const BrandingTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BrandingSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LoginCard = styled.div`
  padding: 36px;
  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(14px);

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Label = styled.label`
  font-size: 13px;
  margin-bottom: 6px;
  display: block;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  margin-bottom: 18px;

  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.primary};

  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 13px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-top: 6px;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary.main},
    ${({ theme }) => theme.colors.primary.dark}
  );

  color: white;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.45);
  }
`;

const FooterText = styled.p`
  margin-top: 20px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin5432");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(loading, error);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authFetch(`${VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      message.success("Login successful");
      navigate("/dashboard");
    } catch (err: any) {
      message.error("Login Failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <LeftSection>
        <Illustration src={LoginPage} alt="Analytics dashboard illustration" />
      </LeftSection>

      <LoginSection>
        <RightSection>
          <BrandingTitle>Analytics Platform</BrandingTitle>

          <BrandingSubtitle>
            Monitor your business performance, analyze trends, and gain insights
            through powerful dashboards.
          </BrandingSubtitle>

          <LoginCard>
            <Title>Welcome Back</Title>
            <Subtitle>Sign in to access your analytics dashboard</Subtitle>

            <form onSubmit={handleLogin}>
              <Label>Work Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit">Access Dashboard</Button>
            </form>

            <FooterText>Secure access for authorized team members</FooterText>
          </LoginCard>
        </RightSection>
      </LoginSection>
    </PageWrapper>
  );
};
