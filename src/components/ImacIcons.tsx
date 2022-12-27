import React from "react";
import _ from "lodash";

type Props = {
  status: string;
};

const classes = {
  alive: "bg-green-500",
  unknown: "bg-gray-500",
  dead: "bg-red-500",
};

function ImacIcons({ status }: Props) {
  const currClass = _(classes).pick(status.toLowerCase()).values();

  return (
    <span className={`inline-block h-2 w-2 mr-2 rounded-full ${currClass}`} />
  );
}

export default ImacIcons;
