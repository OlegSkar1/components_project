import * as ProductsActionCreators from "./products";
import * as CharactersActionCreators from "./characters";

export default {
  ...ProductsActionCreators,
  ...CharactersActionCreators,
};
