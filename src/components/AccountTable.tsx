import styled from 'styled-components';
import { theme } from '../theme';

export type Account = {
  name: string;
  address: string;
  privateKey: string;
  balance: string;
};

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 960px;
  margin-bottom: ${theme.spacing.medium};
`;

const Th = styled.th`
  padding: ${theme.spacing.small};
  font-weight: bold;
  background: ${theme.colors.primary};
  color: white;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius};
`;

const Td = styled.td`
  padding: ${theme.spacing.small};
  text-align: center;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius};
  word-break: break-word;
`;

interface AccountTableProps {
  accounts: Account[];
}

export const AccountTable = ({ accounts }: AccountTableProps) => (
  <Table>
    <thead>
      <tr>
        <Th>Name</Th>
        <Th>Address</Th>
        <Th>Private Key</Th>
        <Th>Balance (XDC)</Th>
      </tr>
    </thead>
    <tbody>
      {accounts.map((acc, idx) => (
        <tr key={idx}>
          <Td>{acc.name}</Td>
          <Td>{acc.address}</Td>
          <Td>{acc.privateKey}</Td>
          <Td>{acc.balance}</Td>
        </tr>
      ))}
    </tbody>
  </Table>
);
