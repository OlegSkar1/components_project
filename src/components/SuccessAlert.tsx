import React, { Component } from "react";

type Props = {
  isUploaded: boolean;
};

class SuccessAlert extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { isUploaded } = this.props;
    const opacityClass = isUploaded ? "opacity-100" : "opacity-0";
    const alertClasses = [
      "p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 transition-opacity duration-500",
      opacityClass,
    ];
    return (
      <div
        id="successAlert"
        data-testid="successAlert"
        className={alertClasses.join(" ")}
        role="alert"
      >
        <span className="font-medium">Продукт создан!</span>
      </div>
    );
  }
}

export default SuccessAlert;
