import Image from "next/image";
import React, { useState } from "react";
// import { Icon } from '@iconify/react';

type PageProps = {
  params: {
    cartId: string;
  };
};

const fetchProducts = async (cartId: string) => {
  const res = await fetch(`${process.env.BASE_URL}/products/${cartId}`, {
    next: { revalidate: 60 },
  });
  const product = await res.json();
  return product;
};

export default async function InformationProduct({
  params: { cartId },
}: PageProps) {
  const product = await fetchProducts(cartId);

  return (
    <section>
      <div className="container grid place-items-center h-screen">
        <div className="grid grid-cols-9 bg-white rounded-lg p-4 shadow-lg">
          {/* left */}
          <div className="col-span-3">
            <div className="flex overflow-scroll scrollbar-hide">
              {product.images?.map((image) => (
                <div className="images">
                  <div className="image relative w-96 h-96">
                    <Image src={image} alt={product.title} fill />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* right */}
          <div className="relative information col-span-6 p-3">
            {/* title */}
            <h1 className="text-4xl font-semibold">{product.title}</h1>
            {/* category */}
            <div className="space-x-3">
              <div className="badge badge-outline">{product.category}</div>
              <div className="badge badge-outline">{product.brand}</div>
            </div>
            {/* description */}
            <div className="mt-5">
              <h2 className="text-2xl font-semibold">Description</h2>
              <p className="text-gray-600 text-md">{product.description}</p>
            </div>
            {/* price */}
            <div className="mt-5">
              <h2 className="text-4xl font-bold text-blue-800">
                ${product.price}
              </h2>
            </div>
            {/* quantity */}
            <div className="flex space-x-2 items-center font-semibold text-lg mt-5">
              <button className="px-4 py-2 border-2 rounded-md active:scale-95">
                -
              </button>
              <input
                type="text"
                name="quantity"
                id="quantity"
                className="text-center outline-none border-none w-4 h-4"
              />
              <button className="px-4 py-2 border-2 rounded-md active:scale-95">
                +
              </button>
              <div>
                <p>stock: {product.stock}</p>
              </div>
            </div>
            {/* action */}
            <div className="absolute bottom-4 right-6 space-x-4 font-semibold text-white">
              <button className="px-4 py-2 bg-orange-600 rounded-lg hover:scale-105 transition transform duration-200 active:scale-95">
                Add to cart
              </button>
              <button className="px-4 py-2 bg-orange-600 rounded-lg hover:scale-105 transition transform duration-200 active:scale-95">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BASE_URL}/products`);
  const { products } = await res.json();

  return products.map((product) => ({
    cartId: product.id.toString(),
  }));
}
