import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface SellerFormProps {}

interface FormData {
  GSTIN: string;
  PAN: string;
  IFSC: string;
  ACCNO: string;
  AADHAR: string;
  imageLink: string;
}

const SellerForm: React.FC<SellerFormProps> = () => {
  const { data: sessionData } = useSession();
  const [emailid, setEmailid] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    GSTIN: '',
    PAN: '',
    IFSC: '',
    ACCNO: '',
    AADHAR: '',
    imageLink: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [imageBase64, setImageBase64] = useState<string>('');
  const [panBase64, setPanBase64] = useState<string>('');
  const [companyPanBase64, setCompanyPanBase64] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setImageBase64(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChangePan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setPanBase64(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChangeCompanyPan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setCompanyPanBase64(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formDataWithImage = { ...formData, aadhar: imageBase64,pan:panBase64 ,companypan:companyPanBase64 };

    handleAPICall(formDataWithImage);
  };

  const handleAPICall = (formData: FormData) => {
    setDisabled(true);
    axios
      .post('/api/posts/register', formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setDisabled(false);
        setSuccess(true);
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
   

      <div
        className={` w-full transition-transform transform bg-white px-4 pt-2` }
      >
        <h2 className='text-2xl'>Fill the following details</h2>
        <form onSubmit={handleSubmit} className="max-w-md">
         
          <div className="mb-4">
            <label htmlFor="GSTIN" className="block text-gray-700 font-semibold">
              GSTIN:
            </label>
            <input
              type="text"
              id="GSTIN"
              name="GSTIN"
              value={formData.GSTIN}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="PAN" className="block text-gray-700 font-semibold">
              PAN:
            </label>
            <input
              type="text"
              id="PAN"
              name="PAN"
              value={formData.PAN}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <h2 className='text-2xl'>Bank Details</h2>

          <div className="flex flex-row gap-4">


          <div className="mb-4">
            <label htmlFor="IFSC" className="block text-gray-700 font-semibold">
              IFSC CODE:
            </label>
            <input
              type="text"
              id="IFSC"
              name="IFSC"
              value={formData.IFSC}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ACCNO" className="block text-gray-700 font-semibold">
              ACCOUNT NO:
            </label>
            <input
              type="text"
              id="ACCNO"
              name="ACCNO"
              value={formData.ACCNO}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          </div>

          <div className="mb-4">
            <label htmlFor="AADHAR" className="block text-gray-700 font-semibold">
              AADHAR:
            </label>
            <input
              type="text"
              id="AADHAR"
              name="AADHAR"
              value={formData.AADHAR}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* <div className="mb-4">
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
          </div> */}

          <div className="mb-4">
            <label htmlFor="image_file" className="block text-gray-700 font-semibold">
              Upload Aadhar:
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
           <div className="mb-4">
            <label htmlFor="image_file" className="block text-gray-700 font-semibold">
              Upload Pan:
            </label>
            <input
              type="file"
              id="image_file"
              name="imageFile"
              onChange={handleImageChangePan}
              accept="image/*" // Allow only image files
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
            <div className="mb-4">
            <label htmlFor="image_file" className="block text-gray-700 font-semibold">
              Upload Company Pan:
            </label>
            <input
              type="file"
              id="image_file"
              name="imageFile"
              onChange={handleImageChangeCompanyPan}
              accept="image/*" // Allow only image files
             
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={disabled}
          >
            Add Seller
          </button>
          {disabled && <p className="text-red-500">Adding Seller...</p>}
          {success && <p className="text-green-500">Seller Added</p>}
        </form>
      </div>
    </>
  );
};

export default SellerForm;
