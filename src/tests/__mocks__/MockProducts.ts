import { IProduct } from "models";

const MockProducts: IProduct[] = [
  {
    id: 1,
    title: "Hard drive",
    price: 3000,
    description: "1tb",
    category: "computer storage devices",
    image: "test image",
    rating: {
      rate: 1500,
      count: 4.6,
    },
  },
  {
    id: 2,
    title: "Men's boots",
    price: 4000,
    description: "light mens boots for a football",
    category: "clother",
    image: "test image",
    rating: {
      rate: 2000,
      count: 4.7,
    },
  },
  {
    id: 3,
    title: "Smartphone",
    price: 30000,
    description: "Best phone ever",
    category: "mobile devices",
    image: "test image",
    rating: {
      rate: 13500,
      count: 5,
    },
  },
];

export default MockProducts;
