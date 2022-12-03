import './App.css';
import MainMit from "./MainMint";
import { useState } from "react";

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="App">
      <MainMit accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
