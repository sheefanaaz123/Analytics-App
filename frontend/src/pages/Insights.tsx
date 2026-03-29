import { useEffect, useState } from "react";
import styled from "styled-components";
import PageContainer from "../components/layout/PageContainer";
import { DashboardSection } from "../components/common/DashboardSection";
import { VITE_BACKEND_URL } from "../constants";
import { authFetch } from "../utils/api";

interface InsightResponse {
  summary: string;
  insights: string[];
  recommendation: string;
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  border-radius: 14px;
  padding: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 20px;
  border: 1px solid #1f2a3c;
`;

const Summary = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const InsightList = styled.ul`
  margin-top: 10px;
  padding-left: 18px;
`;

const InsightItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Recommendation = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  border-left: 4px solid #4f8cff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Loading = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Error = styled.p`
  color: #ef4444;
`;

export const Insights = () => {
  const [data, setData] = useState<InsightResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch(`${VITE_BACKEND_URL}/api/smart-summary`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load insights");
        setLoading(false);
      });
  }, []);

  return (
    <PageContainer>
      <DashboardSection title="Smart Insights">
        {loading && <Loading>Generating AI insights...</Loading>}

        {error && <Error>{error}</Error>}

        {!loading && data && (
          <>
            <Card>
              <h3>AI Summary</h3>
              <Summary>{data.summary}</Summary>
            </Card>

            <Card>
              <h3>Key Insights</h3>
              <InsightList>
                {data.insights?.map((insight, index) => (
                  <InsightItem key={index}>{insight}</InsightItem>
                ))}
              </InsightList>
            </Card>
            <Card>
              <h3>Recommendation</h3>
              <Recommendation>{data.recommendation}</Recommendation>
            </Card>
          </>
        )}
      </DashboardSection>
    </PageContainer>
  );
};
