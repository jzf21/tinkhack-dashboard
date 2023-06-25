import React from "react";

type Props = {
  title: string,
  price: number,
  image: string,
  rating: number,
  description: string,
  qty: number,
  size: string,
};

const ProductCard = (props: Props) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        {/* <img
          className="p-8 rounded-t-lg"
          src="/docs/images/products/apple-watch.png"
          alt="product image"
        /> */}
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </a>

        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{props.price}
          </span>
          <div className="flex items-center">
            <label
              htmlFor="qty"
              className="mr-2 text-gray-700 dark:text-gray-300"
            >
              Qty:
            </label>
            <select
              id="qty"
              name="qty"
              className="w-16 py-1 px-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={props.qty}
              onChange={(e) => console.log(e.target.value)} // Add your logic to handle quantity change
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              {/* Add more quantity options as needed */}
            </select>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <label
            htmlFor="size"
            className="mr-2 text-gray-700 dark:text-gray-300"
          >
            Size:
          </label>
          <select
            id="size"
            name="size"
            className="w-24 py-1 px-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={props.size}
            onChange={(e) => console.log(e.target.value)} // Add your logic to handle size change
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            {/* Add more size options as needed */}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sold
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
