import React, { useState } from "react";
import { IProduct } from "models";

interface Props {
  product: IProduct;
}

export default function Card({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const btnBgClasses = isOpen ? "bg-yellow-500" : "bg-blue-500";
  const btnClasses = ["py-2 px-4 border rounded", btnBgClasses];

  const clickHandler = () => setIsOpen((prev) => !prev);

  return (
    <div
      data-testid="Card"
      className="flex flex-col items-center text-center justify-between p-6 max-w-[280px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      key={product.id}
    >
      <img src={product.image} className="w-1/2" />
      <span className="font-bold pb-2">{product.title}</span>
      <span className="pb-2">{product.price}$</span>
      {isOpen && <p className="pb-2">{product.description}</p>}
      <button className={btnClasses.join(" ")} onClick={clickHandler}>
        {isOpen ? "hide details" : "show details"}
      </button>
    </div>
  );
}
