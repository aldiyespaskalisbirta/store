import Image from "next/image";
import Link from "next/link";

const fetchProducts = async () => {
  const res = await fetch(`${process.env.BASEURL}/products`);
  const { products } = await res.json();

  return products;
};

export default async function page() {
  const products = await fetchProducts();
  console.log(products);
  return (
    <section className="home-page mt-10" id="home-page">
      <div className="container bg-slate-200 flex flex-col items-center">
        <div className="products grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, idx) => (
            <div className="card h-80 bg-base-100 shadow-xl" key={idx}>
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
                <Link
                  href={`/${product.id}`}
                  className="card-title cursor-pointer"
                >
                  {product.title}
                </Link>
                <div className="badge badge-secondary">$ {product.price}</div>
                <p className="line-clamp-2">{product.description}</p>
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
