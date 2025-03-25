import styled from 'styled-components'; // ✅ classic import for v5


import { theme } from "../theme.js";

const Button = styled.button`
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  font-size: ${theme.typography.button};
  border-radius: ${theme.radius};
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  margin-left: ${theme.spacing.medium};
`;

interface RefreshButtonProps {
  onClick: () => void;
}

export const RefreshButton = ({ onClick }: RefreshButtonProps) => (
  <Button onClick={onClick}>🔄 Refresh Balances</Button>
);
