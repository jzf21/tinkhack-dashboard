import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react"

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  sellerEmail: string;
  productName: string;
  quantity: number;
  category: string;
  size: string;
  imageLink: string;
}

const AddProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {

  const {data:sessionData} =useSession();
  
 
  const [emailid, setEmailid] = useState<string>(sessionData?.user?.email);
  const [formData, setFormData] = useState<FormData>({
    sellerEmail: "",
    productName: "",
    quantity: 0,
    category: "",
    size: "",
    imageLink: "",
  });
 
   useEffect(() => {
    if (sessionData?.user?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        sellerEmail: sessionData.user.email,
      }));
    }
  }, [sessionData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    handleAPICall(formData);
  };

  const handleAPICall = (formData: FormData) => {
    // Make an API call using axios or your preferred HTTP library
    axios.post("/api/posts/insertproduct", formData)
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md  translate-x-[100px]">
  <div className="mb-4">
    <label htmlFor="product_name" className="block text-gray-700 font-semibold">
      Product Name:
    </label>
    <input
      type="text"
      id="product_name"
      name="productName"
      value={formData.productName}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="quantity" className="block text-gray-700 font-semibold">
      Quantity:
    </label>
    <input
      type="number"
      id="quantity"
      name="quantity"
      value={formData.quantity}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="category" className="block text-gray-700 font-semibold">
      Category:
    </label>
    <input
      type="text"
      id="category"
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="size" className="block text-gray-700 font-semibold">
      Size:
    </label>
    <input
      type="text"
      id="size"
      name="size"
      value={formData.size}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="image_link" className="block text-gray-700 font-semibold">
      Image Link:
    </label>
    <input
      type="text"
      id="image_link"
      name="imageLink"
      value={formData.imageLink}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>

  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
  >
    Add Product
  </button>
</form>

  );
};
export default AddProductForm;