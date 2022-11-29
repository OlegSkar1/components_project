import { useContext } from "react";
import { Context, dispatchContext } from "../context";

function useMyContext() {
  const state = useContext(Context);
  const dispatch = useContext(dispatchContext);
  return { state, dispatch };
}

export { useMyContext };
