import React from "react";

interface IButtonProps {
  name: string;
}

const Button: React.FC<IButtonProps> = ({ name }) => {
  return (
    <button className="bg-button text-white font-semibold tracking-wider py-4  rounded w-full">
      {name}
    </button>
  );
};

export default Button;