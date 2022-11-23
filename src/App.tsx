import React, { useState } from "react";
import Cart from "./Cart";
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

      {user && (
        <>
          <p>Logged in as {user}</p>
          <Cart />
        </>
      )}
    </div>
  );
}

export default App;
