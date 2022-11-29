import Image from "next/image";
import React, { useState } from "react";
// import { Icon } from '@iconify/react';

type PageProps = {
  params: {
    cartId: string;
  };
};

const fetchProducts = async (cartId: string) => {
  const res = await fetch(`${process.env.BASEURL}/products/${cartId}`, {
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
    <div className="grid min-h-screen items-center">
      <div className="card card-side bg-base-100 shadow-xl">
        <div className="w-96 h-full carousel rounded-box">
          {product.images.map((image, idx) => (
            <div className="carousel-item w-full" key={idx}>
              <Image
                src={image}
                height={350}
                width={350}
                alt={product.title}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        <div className="card-body">
          {/* title */}
          <div className="title">
            <h2 className="card-title">{product.title}</h2>
          </div>

          {/* rating */}
          <div className="rating">
            <p>
              {/* <Icon icon="material-symbols:star" className="text-yellow-400" /> */}
              {product.rating}
            </p>
          </div>

          {/* description */}
          <div className="description">
            <h2 className="font-semibold text-md ">Description</h2>
            <p className="card-description">{product.description}</p>
          </div>

          {/* price */}
          <div className="price">
            <h1 className="text-2xl text-red-400 font-bold">
              $ {product.price}
            </h1>
          </div>
          {/* action */}
          <div className="card-actions absolute space-x-4 bottom-5 items-center">
            <div className="btn-group">
              <button className="btn">-</button>
              <button className="btn">2</button>
              <button className="btn">+</button>
            </div>
            <div className="information-stock">stock: {product.stock}</div>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BASEURL}/products`);
  const { products } = await res.json();

  return products.map((product) => ({
    cartId: product.id.toString(),
  }));
}
