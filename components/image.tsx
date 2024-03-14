import React from "react";

interface ImageCardProps {
  title?: string;
  image?: React.ReactNode;
  onClick?: () => void;
}

export default function Image({ image, title, onClick }: ImageCardProps) {
  return (
    <div
      onClick={onClick}
      key={title}
      className={`flex flex-col cursor-pointer`}
    >
      {image}
      <div className={`flex items-center justify-between py-2`}>
        <span className={`text-sm text-black dark:text-gray-400`}>{title}</span>
      </div>
    </div>
  );
}
