import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { useSession } from "next-auth/react";

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
    name: string;
    imageLink: string;
    imageUrl: string;

  // Add more properties as per your schema
}

const MyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/get/myproducts", {
          withCredentials: true,
        });
        console.log(response.data);
        setAllProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };


    fetchProducts();
   
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold p-4">My Products</h1>


      <h1>My Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 ">
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

export default MyProducts;
