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
    <div className="flex flex-col">
      
      <div className="">
    
        <img src={props.imageUrl} alt="" className=" h-[300px] object-contain" />
       <div className="flex flex-col">
          <h1 className="text-lg text-gray-500 ">{props.title}</h1>
        <p className="text-xl  text-gray-700">${props.price}</p>
        </div>
        
        
        {/* <p className="text-sm text-gray-500">{props.size}</p>
        <p className="text-sm text-gray-500">{props.quantity}</p>
        <p className="text-sm text-gray-500">{props.rating}</p>
        <p className="text-sm text-gray-500">{props.price}</p> */}
        
      </div>
    </div>

  );
};

export default ProductCard;
