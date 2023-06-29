import React, { useState } from "react";

const FloatingButton: React.FC = () => {
    const [open,setOpen]=useState(false);
  return (
    <button
      className="fixed bottom-4 right-4  w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
      onClick={() => {
        setOpen(!open);
        // Handle button click event
      }}
    >
      +
    </button>
  );
};

export default FloatingButton;
