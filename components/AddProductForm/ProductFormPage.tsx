import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface ProductFormProps {
  
}

interface FormData {
  
  productName: string;
  quantity: number;
  category: string;
  price: number;
  size: string;
  imageLink: string;
}

const ProductFormPage: React.FC<ProductFormProps> = () => {
  const { data:sessionData } = useSession();
  const [emailid, setEmailid] = useState<string>('');
 
  const [disabled,setDisabled] = useState<boolean>(false);
  const [sucess , setSucess] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
   
    productName: "",
    quantity: 0,
    price:0,
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
  const [imageBase64, setImageBase64] = useState<string >("");

 const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    // Read the file and convert it to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(",")[1]; // Remove the data:image/...;base64, part
      setImageBase64(base64Data);
    };
    reader.readAsDataURL(file);
  }
};
const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Include the Base64 image data in the form data
    const formDataWithImage = { ...formData, imageLink: imageBase64 };

    handleAPICall(formDataWithImage);
  };
  
 const handleAPICall = (formData: FormData) => {
  setDisabled(true)
  axios
    .post("/api/posts/inserimage", formData, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      setDisabled(false)
      setSucess(true)
      
    })
    .catch((error) => {
      console.error(error);
    });
};


 

  return (
    <>
     
    
      <div
        className="  w-1/2   bg-white px-4 pt-2   "
      >
 
        <form onSubmit={handleSubmit} className="max-w-md   ">
             
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
    <label htmlFor="price" className="block text-gray-700 font-semibold">
      price:
    </label>
    <input
      type="text"
      id="price"
      name="price"
      value={formData.price}
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
    <div className="mb-4">
          <label htmlFor="image_file" className="block text-gray-700 font-semibold">
            Upload Image:
          </label>
          <input
            type="file"
            id="image_file"
            name="imageFile"
            onChange={handleImageChange}
            accept="image/*" // Allow only image files
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />

        </div>
        
     


  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    disabled={disabled}
  >
    Add Product
  </button>
  {disabled && <p className="text-red-500">Adding Product...</p>}
  {sucess && <p className="text-green-500">Product Added</p>}
</form>
      </div>
    </>
  );
};

export default ProductFormPage;
