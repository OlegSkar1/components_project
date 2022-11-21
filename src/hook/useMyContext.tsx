import { useContext } from "react";
import { Context } from "../context";

function useMyContext() {
  return useContext(Context);
}

export { useMyContext };
