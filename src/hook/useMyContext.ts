import { useContext } from "react";
import { Context, MyContext } from "../context";

function useMyContext() {
  return useContext(Context) as MyContext;
}

export { useMyContext };
