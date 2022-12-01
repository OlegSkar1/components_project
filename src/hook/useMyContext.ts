import { useContext } from "react";
import { Context, IContext } from "../context";

function useMyContext() {
  return useContext(Context) as IContext;
}

export { useMyContext };
