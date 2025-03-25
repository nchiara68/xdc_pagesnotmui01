import express from "express";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Wallet, JsonRpcProvider, formatEther } from "ethers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;



// 🔧 Construct full, safe path to accounts.json regardless of where Node is started
const accountsFile = path.join(__dirname, "accounts.json");

// 📡 XDC Apothem Testnet RPC
const provider = new JsonRpcProvider("https://erpc.apothem.network");

app.use(cors());
app.use(express.json());

type Account = {
  name: string;
  privateKey: string;
  address: string;
  balance: string;
};

const loadAccounts = (): Account[] => {
  console.log("🔍 Loading accounts from:", accountsFile);

  if (!fs.existsSync(accountsFile)) return [];

  const data = fs.readFileSync(accountsFile, "utf-8");
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("❌ Failed to parse accounts.json:", e);
    return [];
  }
};

const saveAccounts = (accounts: Account[]) => {
  fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2));
};

app.get("/", (_req, res) => {
  res.send("✅ XDC Account Manager API is running");
});

// ✅ GET /accounts — returns all accounts with live balances
app.get("/accounts", async (_req, res) => {
  const accounts = loadAccounts();

  const withBalances = await Promise.all(
    accounts.map(async (acc) => {
      const balance = await provider.getBalance(acc.address);
      return {
        ...acc,
        balance: formatEther(balance),
      };
    })
  );

  res.json(withBalances);
});

// ✅ POST /generate — creates new accounts and persists them
app.post("/generate", async (_req, res) => {
  const names = ["Toknar", "Seller", "Funder", "Debtor"];
  const existing = loadAccounts();

  const newAccounts = await Promise.all(
    names.map(async (name) => {
      const wallet = Wallet.createRandom();
      const balance = await provider.getBalance(wallet.address);

      return {
        name,
        privateKey: wallet.privateKey,
        address: wallet.address,
        balance: formatEther(balance),
      };
    })
  );

  const updated = [...existing, ...newAccounts];
  saveAccounts(updated);
  res.json(newAccounts);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
