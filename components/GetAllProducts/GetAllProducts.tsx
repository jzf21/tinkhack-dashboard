import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  category: string;
  size: string;
  image: string;
  rating: number;
  description: string;
  
  // Add more properties as per your schema
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/get/myproducts", {
          withCredentials: true,
        });
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("/api/get/getProducts", {
          withCredentials: true,
        });
        console.log(response.data);
        setAllProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    fetchAllProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold p-4">My Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div className="" key={product.id}>
            <ProductCard {...product} />
            {/* Add more product details */}
          </div>
        ))}
      </div>

      <h1>All Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {allProducts.map((product) => (
          <div className="" key={product.id}>
            <ProductCard {...product} />
            {/* Add more product details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
