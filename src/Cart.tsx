import React, { useState } from "react";

const ads = [
  {
    name: "Classic Ad",
    description: "Offers the most basic level of advertisement",
    price: 269.99,
  },
  {
    name: "Stand out Ad",
    description:
      "Allows advertisers to use a company logo and use a longer presentation text",
    price: 322.99,
  },
  {
    name: "Premium Ad",
    description:
      "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
    price: 394.99,
  },
];

const Cart = () => {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <ul>
        {ads.map((ad) => (
          <li>
            {ad.name} ${ad.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
