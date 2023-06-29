import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

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

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const { data:sessionData } = useSession();
  const [emailid, setEmailid] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    sellerEmail: emailid,
    productName: "",
    quantity: 0,
    category: "",
    size: "",
    imageLink: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleAPICall(formData);
  };
   useEffect(() => {
    if (sessionData?.user?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        sellerEmail: sessionData.user.email,
      }));
    }
  }, [sessionData]);

  const handleAPICall = (formData: FormData) => {
    axios
      .post("/api/posts/insertproduct", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <>
      <button
        onClick={toggleForm}
        className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
      >
        +
      </button>
    
      <div
        className={`fixed top-0 right-0 h-screen w-1/3 transition-transform transform bg-white p-2   mt-16 ${
          showForm ? "translate-x-0" : "translate-x-full"
        }`}
      >
 
        <form onSubmit={handleSubmit} className="max-w-md  ">
                   <button
                   
        onClick={toggleForm}
        className="fixed top-4 right-5 h-6 w-6  bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
      >
        X
      </button>
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
      </div>
    </>
  );
};

export default ProductForm;
