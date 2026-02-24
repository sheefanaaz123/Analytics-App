import styled from "styled-components";

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
