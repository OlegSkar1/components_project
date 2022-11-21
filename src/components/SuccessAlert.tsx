import React, { useEffect, useState } from "react";

type Props = {
  isSubmitted: boolean;
};

function SuccessAlert({ isSubmitted }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setIsVisible(true);
    } else if (!isSubmitted) {
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  }, [isSubmitted]);

  const opacityClass = isVisible ? "opacity-100" : "opacity-0";

  const alertClasses = [
    "w-1/3 m-auto py-2.5 px-5 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 transition-all duration-500",
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
