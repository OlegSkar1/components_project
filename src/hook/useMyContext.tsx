import { useContext } from "react";
import { Context, MyContext } from "../context";

function useMyContext() {
  const { state, dispatch } = useContext(Context) as MyContext;
  return { state, dispatch };
}

export { useMyContext };
