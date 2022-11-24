import React, { useState } from "react";

type Ad = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const defaultAds = [
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

const getAdById = (id: number, ads: Ad[]) => ads.find((ad) => ad.id === id);

type CartItem = {
  id: number;
  qty: number;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [ads, setAds] = useState(defaultAds);

  const addToCart = (id: number) => {
    const cartItem = cartItems.find((item) => id === item.id) || { id, qty: 0 };
    cartItem.qty++;
    const otherCartItems = cartItems.filter((item) => id !== item.id);
    // this wont preserve order, need to slice with index
    setCartItems([...otherCartItems, cartItem]);
  };

  console.log(cartItems);

  const calcCartTotal = () => {
    const total = cartItems.reduce((sum, item) => {
      const ad = getAdById(item.id, ads);
      return ad ? ad.price * item.qty + sum : sum;
    }, 0);
    return total.toFixed(2);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <ul>
        {defaultAds.map((ad) => (
          <li>
            {ad.name} ${ad.price}
            <button onClick={() => addToCart(ad.id)}>+</button>
          </li>
        ))}
      </ul>
      {cartItems.map((item) => (
        <>
          <p>{getAdById(item.id, ads)?.name}</p>
          <p>qty: {item.qty}</p>
        </>
      ))}
      <p>Total ${calcCartTotal()}</p>
      <button onClick={clearCart}>Clear cart</button>
    </div>
  );
};

export default Cart;
