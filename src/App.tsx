import React, { useState } from "react";
import Cart from "./Cart";
import logo from "./logo.svg";

export type PricingRule =
  | {
      discountType: "single";
      discountValue: number;
      adId: number;
    }
  | { discountType: "bulk"; minQty: number; dealQty: number; adId: number };

type User = {
  name: string;
  pricingRules: PricingRule[];
};

export type Ad = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const defaultAds: Ad[] = [
  {
    id: 1,
    name: "Classic Ad",
    description: "Offers the most basic level of advertisement",
    price: 269.99,
  },
  {
    id: 2,
    name: "Stand out Ad",
    description:
      "Allows advertisers to use a company logo and use a longer presentation text",
    price: 322.99,
  },
  {
    id: 3,
    name: "Premium Ad",
    description:
      "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
    price: 394.99,
  },
];

const users: User[] = [
  {
    name: "SecondBite",
    pricingRules: [{ discountType: "bulk", minQty: 3, dealQty: 2, adId: 1 }],
  },
  {
    name: "Axil Coffee Roasters",
    pricingRules: [{ discountType: "single", discountValue: 299.99, adId: 2 }],
  },
  {
    name: "Myer",
    pricingRules: [
      { discountType: "single", discountValue: 389.99, adId: 3 },
      { discountType: "bulk", minQty: 5, dealQty: 4, adId: 2 },
    ],
  },
  { name: "Regular", pricingRules: [] },
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <div className="App">
      {user ? (
        <>
          <p>Logged in as {user.name}</p>
          <Cart defaultAds={defaultAds} pricingRules={user.pricingRules} />
        </>
      ) : (
        <>
          <p>Pick a User</p>
          {users.map((u) => (
            <button
              onClick={() => {
                setUser(u);
              }}
            >
              {u.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
