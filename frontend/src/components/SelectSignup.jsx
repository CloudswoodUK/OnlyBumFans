import React from 'react';

const SelectSignup = ({ icon: Icon, options = [], value, onChange, ...props }) => {
  return (
    <div className='w-full relative mb-2'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className='size-5 text-red-700' />
      </div>
      <select 
        value={value}  // Bind the value to the select element
        onChange={onChange}  // Handle change events
        className='w-full pl-10 pr-10 py-2 bg-gray-400 bg-opacity-50 rounded-lg border-red-700 focus:border-red-700 focus:ring-2
        focus:ring-red-700 text-black placeholder-gray-700 transition duration-200'
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSignup;
