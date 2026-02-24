import styled from "styled-components";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Inner = styled.div`
  margin: 0 auto;
  width: 100%;
`;

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Inner>{children}</Inner>
    </Wrapper>
  );
}
