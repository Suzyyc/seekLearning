import React, { useState } from "react";
import logo from "./logo.svg";

const users = ["SecondBite", "Axil Coffee Roasters", "Myer", "Regular"];

function App() {
  const [user, setUser] = useState<string | null>(null);
  return (
    <div className="App">
      <p>Pick a User</p>
      {users.map((u) => (
        <button
          onClick={() => {
            setUser(u);
          }}
        >
          {u}
        </button>
      ))}
      {user}
    </div>
  );
}

export default App;
