import React from "react";

type Props = {
  isSubmitted: boolean;
};

function SuccessAlert({ isSubmitted }: Props) {
  const opacityClass = isSubmitted ? "opacity-100" : "opacity-0";
  const alertClasses = [
    "absolute w-1/3 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 transition-all duration-500",
    opacityClass,
  ];
  return (
    <div
      id="successAlert"
      data-testid="successAlert"
      className={alertClasses.join(" ")}
      role="alert"
    >
      <span className="font-medium text-center">Продукт создан!</span>
    </div>
  );
}

export default SuccessAlert;
