import React from "react";

type Props = {
  error: string;
};

export const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <div>
      {error && (
        <p
          data-testid="error"
          className="text-center mt-10 text-red-600 text-lg"
        >
          {error}
        </p>
      )}
    </div>
  );
};
