"use client";
import React from "react";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <nav className="bg-orange-500 flex justify-center">
      <div className="container flex justify-between py-3">
        <div className="brand font-bold text-white text-3xl">STORE</div>
        <div className="navigation flex space-x-3 items-center">
          {/* search */}
          <div className="search border-2 bg-white rounded-full px-2 flex items-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="outline-none border-none bg-transparent px-2  font-semibold text-[12px]"
              />
              <button type="submit">
                <Icon icon="ic:baseline-search" className="" />
              </button>
            </form>
          </div>
          {/* cart */}
          <div className="cart">
            <div className="indicator ">
              <span className="indicator-item badge badge-secondary">3</span>
              <div className="grid place-items-center bg-transparent">
                <Icon
                  icon="material-symbols:shopping-cart-outline-rounded"
                  className="text-3xl text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
