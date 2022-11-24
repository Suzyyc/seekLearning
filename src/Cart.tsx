import React, { useEffect, useState } from "react";
import { Ad, PricingRule } from "./App";

const getAdById = (id: number, ads: Ad[]) => ads.find((ad) => ad.id === id);

type CartItem = {
  id: number;
  qty: number;
};

type Props = {
  defaultAds: Ad[];
  pricingRules: PricingRule[];
};

const Cart: React.FC<Props> = ({ defaultAds, pricingRules }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [ads, setAds] = useState(defaultAds);

  useEffect(() => {
    if (pricingRules.length > 0) {
      const updatedAds = ads.map((ad) => {
        const rule = pricingRules.find(
          (pr) => pr.discountType === "single" && pr.adId === ad.id
        );
        if (rule && rule.discountType === "single") {
          return { ...ad, price: rule.discountValue };
        }
        return ad;
      });
      setAds(updatedAds);
    }
  }, []);

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
        {ads.map((ad) => (
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
