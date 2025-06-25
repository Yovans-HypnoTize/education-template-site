import React from "react";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  styleProps?: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  title,
  onClick,
  icon,
  styleProps,
}) => {
  const btnStyles = styleProps
    ? styleProps
    : `
  w-full bg-[#5580FF] text-white py-3 px-2 rounded-md hover:shadow transition cursor-pointer
  `;
  return (
    <button
      type={type || "button"}
      className={btnStyles + "flex justify-center items-center"}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{title}</span>
    </button>
  );
};

export default CustomButton;
