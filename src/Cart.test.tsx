import React from "react";
import { render, screen } from "@testing-library/react";
import {
  applySingleAdDiscounts,
  calcCartTotal,
  CartItem,
  getAdById,
} from "./Cart";
import { defaultAds, PricingRule } from "./App";

test("finding Ad by Id", () => {
  expect(getAdById(3, defaultAds)).toEqual({
    id: 3,
    name: "Premium Ad",
    description:
      "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
    price: 394.99,
  });
});

test("apply single discounts", () => {
  const pricingRules: PricingRule[] = [
    { discountType: "single", discountValue: 299.99, adId: 2 },
  ];
  const updatedAds = applySingleAdDiscounts(defaultAds, pricingRules);
  const ad = getAdById(2, updatedAds);
  expect(ad?.price).toEqual(299.99);
});

test("calculate total cart without price rules", () => {
  const cartItems: CartItem[] = [{ adId: 3, qty: 4 }];
  const total = calcCartTotal(cartItems, defaultAds, []);
  expect(total).toEqual(1579.96);
});

test("apply bulk discount", () => {
  const pricingRules: PricingRule[] = [
    { discountType: "bulk", minQty: 5, dealQty: 4, adId: 2 },
  ];
  const cartItems: CartItem[] = [{ adId: 2, qty: 6 }];
  const total = calcCartTotal(cartItems, defaultAds, pricingRules);
  expect(total).toEqual(1614.95);
});
