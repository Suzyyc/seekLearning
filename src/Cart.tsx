import React, { useEffect, useState } from "react";
import { Ad, PricingRule } from "./App";

const getAdById = (id: number, ads: Ad[]) => ads.find((ad) => ad.id === id);

const applySingleAdDiscounts = (ads: Ad[], pricingRules: PricingRule[]) =>
  ads.map((ad) => {
    const rule = pricingRules.find(
      (pr) => pr.discountType === "single" && pr.adId === ad.id
    );
    if (rule && rule.discountType === "single") {
      return { ...ad, price: rule.discountValue };
    }
    return ad;
  });

const calcCartTotal = (
  cartItems: CartItem[],
  ads: Ad[],
  pricingRules: PricingRule[]
) => {
  const total = cartItems.reduce((sum, item) => {
    const ad = getAdById(item.adId, ads);
    let quantity = item.qty;

    if (pricingRules.length > 0) {
      const pricingRule = pricingRules.find((rule) => rule.adId === item.adId);

      if (
        pricingRule &&
        pricingRule.discountType === "bulk" &&
        item.qty >= pricingRule.minQty
      ) {
        const leftoverQty = item.qty % pricingRule.minQty;
        const dealCount = Math.floor(item.qty / pricingRule.minQty);
        quantity = leftoverQty + dealCount * pricingRule.dealQty;
      }
    }

    return ad ? ad.price * quantity + sum : sum;
  }, 0);

  return total.toFixed(2);
};

type CartItem = {
  adId: number;
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
      const updatedAds = applySingleAdDiscounts(ads, pricingRules);
      setAds(updatedAds);
    }
  }, []);

  const addToCart = (id: number) => {
    const cartItem = cartItems.find((item) => id === item.adId) || {
      adId: id,
      qty: 0,
    };
    cartItem.qty++;
    const otherCartItems = cartItems.filter((item) => id !== item.adId);
    // this wont preserve order, need to slice with index
    setCartItems([...otherCartItems, cartItem]);
  };

  console.log(cartItems);

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
          <p>{getAdById(item.adId, ads)?.name}</p>
          <p>qty: {item.qty}</p>
        </>
      ))}
      <p>Total ${calcCartTotal(cartItems, ads, pricingRules)}</p>
      <button onClick={clearCart}>Clear cart</button>
    </div>
  );
};

export default Cart;
