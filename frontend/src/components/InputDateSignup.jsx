// InputDateSignup.jsx
import React, { cloneElement, Children } from 'react';

const InputDateSignup = ({ icon: Icon, children, ...props }) => {
  const inputProps = {
    className: "w-full pl-10 pr-3 py-2 bg-gray-400 bg-opacity-50 rounded-lg border-red-700 focus:border-red-700 focus:ring-2 focus:ring-red-700 text-black placeholder-gray-700 transition duration-200",
    ...props
  };

  return (
    <div className="w-full relative mb-2">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-transparent">
        <Icon className="size-5 text-red-700" />
      </div>
      <div className="w-full pl-10 pr-3 py-2 bg-gray-400 bg-opacity-50 rounded-lg border-red-700 focus:border-red-700 focus:ring-2 focus:ring-red-700 text-black placeholder-gray-700 transition duration-200">
        {/* Render children with additional props */}
        {Children.map(children, child =>
          cloneElement(child, { ...props })
        )}
      </div>
    </div>
  );
};

export default InputDateSignup;

