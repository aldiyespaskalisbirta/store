import React from "react";

const fetchProducts = async () => {
  const res = await fetch(`${process.env.BASEURL}/products`);
  const products = await res.json();
  return products;
};

export default async function page() {
  const { products } = await fetchProducts();
  return (
    <section className="home-page mt-10" id="home-page">
      <div className="container bg-slate-200">
        <div className="products grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, idx) => (
            <div className="card h-80 bg-base-100 shadow-xl" key={idx}>
              <figure className="min-h-40 items-center">
                <img src={product.thumbnail} alt={product.title} />
              </figure>
              <div className="card-body">
                <button className="card-title cursor-pointer">
                  {product.title.substring(0, 10)}
                  <div className="badge badge-secondary">$ {product.price}</div>
                </button>
                <p>{product.description.substring(0, 25)}...</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{product.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
