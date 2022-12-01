import Image from "next/image";
import Link from "next/link";
// import { fetchProducts } from "./utils/products";
const fetchProducts = async () => {
  const res = await fetch(`${process.env.BASE_URL}/products`);
  const { products } = await res.json();

  return products;
};

export default async function page() {
  const products = await fetchProducts();
  return (
    <section className="home-page mt-10" id="home-page">
      <div className="container flex flex-col items-center">
        <div className="products grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <Link
              href={`/${product.id}`}
              className="card-title cursor-pointer hover:scale-105 transition transform duration-200 ease-out active:scale-95"
            >
              <div className="card h-80 bg-base-100 shadow-xl" key={product.id}>
                <figure className=" min-h-16 items-center">
                  <Image
                    src={product.thumbnail}
                    width={350}
                    height={350}
                    style={{ objectFit: "contain" }}
                    alt={product.title}
                  />
                </figure>
                <div className="card-body">
                  <h1 className="text-md">{product.title}</h1>
                  <div className="badge badge-secondary">$ {product.price}</div>
                  <p className="line-clamp-2 text-gray-400 text-sm mb-8">
                    {product.description}
                  </p>
                  <div className="absolute bottom-4 right-4 card-actions">
                    <div className="badge badge-outline text-gray-400">
                      {product.category}
                    </div>
                    <div className="badge badge-outline text-gray-400">
                      {product.brand}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
