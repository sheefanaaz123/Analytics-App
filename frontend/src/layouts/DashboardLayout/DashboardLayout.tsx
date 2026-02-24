import { Outlet } from "react-router-dom";
import { TopBar } from "../../components/ui/TopBar";
import styled from "styled-components";
import { SideBar } from "../../components/ui/SideBar";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.default};
`;

const SideBarWrapper = styled.div`
  flex-shrink: 0;
  z-index: 100;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const TopBarWrapper = styled.div`
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 99;
  background: ${({ theme }) => theme.colors.background.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const ContentSection = styled.section`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const DashboardLayout = () => {
  return (
    <DashboardContainer>
      <SideBarWrapper>
        <SideBar />
      </SideBarWrapper>

      <MainContent>
        <TopBarWrapper>
          <TopBar />
        </TopBarWrapper>
        <ContentSection>
          <Outlet />
        </ContentSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;
