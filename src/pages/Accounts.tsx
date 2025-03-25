import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Account, AccountTable } from '../components/AccountTable.js';
import { GenerateButton } from '../components/GenerateButton.js';
import { theme } from '../theme.js';
import { RefreshButton } from "../components/RefreshButton.js";

const Container = styled.div`
  padding: ${theme.spacing.large};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchAccounts = async () => {
    const res = await fetch("http://localhost:4000/accounts");
    const data = await res.json();
    setAccounts(data);
  };

  const handleGenerate = async () => {
    await fetch("http://localhost:4000/generate", { method: "POST" });
    fetchAccounts();
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Container>
  <h1>🔐 XDC Apothem Accounts</h1>
  <AccountTable accounts={accounts} />
  <div style={{ display: "flex", gap: "1rem" }}>
    <GenerateButton onClick={handleGenerate} />
    <RefreshButton onClick={fetchAccounts} /> {/* ✅ JSX used here */}
  </div>
</Container>
  );
};
