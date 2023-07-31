import React from "react";

type Props = {
  title: string,
  price: number,
  image: string,
  rating: number,
  description: string,
  quantity: number,
  size: string,
  name: string,
  imageLink: string,
  imageUrl: string,
};

const ProductCard = (props: Props) => {
  const supabaseurl=process.env.NEXT_PUBLIC_SUPABASE_URL
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      
      <div className="">
        <h1 className="text-lg font-semibold text-center">{props.title}</h1>
        <img src={props.imageUrl} alt="" className="w-full h-48 object-contain" />
        
        <p className="text-sm text-gray-500">Size:{props.size}</p>
        <p className="text-sm text-gray-500">Quantity:{props.quantity}</p>
       
        <p className="text-sm text-gray-500">Price:{props.price}</p>
        <p className="text-sm text-gray-500">Seller:{props.name}</p>
        
        
        {/* <p className="text-sm text-gray-500">{props.size}</p>
        <p className="text-sm text-gray-500">{props.quantity}</p>
        <p className="text-sm text-gray-500">{props.rating}</p>
        <p className="text-sm text-gray-500">{props.price}</p> */}
        
      </div>
    </div>

  );
};

export default ProductCard;
