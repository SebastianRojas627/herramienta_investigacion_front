import React from "react";

type TitleProps = {
  text: string;
  className?: string;
};

const Title: React.FC<TitleProps> = ({ text, className = "" }) => {
  return (
    <h2
      className={`text-3xl font-bold text-gray-950 dark:text-white border-b-2 border-gray-300 dark:border-gray-600 pb-2 ${className}`}
    >
      {text}
    </h2>
  );
};

export default Title;
