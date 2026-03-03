import styled from "styled-components";

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1300px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
