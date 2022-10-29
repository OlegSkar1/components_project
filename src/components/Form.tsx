import React, { Component, createRef } from "react";
import { Context, ContextInterface } from "../context";

const fileReader = new FileReader();

interface IFormState {
  imageURL: string;
}
export default class Form extends Component<unknown, IFormState> {
  static contextType = Context;

  title = createRef<HTMLInputElement>();
  category = createRef<HTMLInputElement>();
  price = createRef<HTMLInputElement>();
  description = createRef<HTMLTextAreaElement>();
  image = createRef<HTMLInputElement>();
  form = createRef<HTMLFormElement>();

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { addProduct } = this.context as ContextInterface;

    const title = this.title.current?.value;
    const image = this.image.current?.files?.item(0);
    const description = this.description.current?.value;
    const price = this.price.current?.value;
    const category = this.category.current?.value;
    const id = Date.now();

    if (title && image && description && price && id && category) {
      fileReader.onloadend = () => {
        addProduct({
          id,
          title,
          category,
          description,
          price: Number(price),
          image: fileReader.result as string,
        });
      };
      fileReader.readAsDataURL(image);
    }
  };

  render() {
    const { product } = this.context as ContextInterface;
    console.log(product?.image);
    return (
      <>
        <h1 className="mt-5 text-center text-4xl font-bold dark:text-white">
          Карточка добавления продукта
        </h1>
        <form
          id="form"
          ref={this.form}
          className="mt-7 w-1/3 m-auto"
          onSubmit={this.handleSubmit}
        >
          <input
            placeholder="Название продукта"
            type="text"
            id="title"
            name="productTitle"
            ref={this.title}
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <input
            placeholder="Категория продукта"
            type="text"
            id="category"
            name="productCategory"
            ref={this.category}
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <input
            placeholder="Стоимость"
            type="number"
            id="price"
            ref={this.price}
            name="productPrice"
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <textarea
            id="message"
            rows={4}
            ref={this.description}
            name="productDescription"
            className="block mb-4 resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Введите описание продукта"
          />

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="file_input"
          >
            Загрузить картинку
          </label>
          <input
            className="block mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept="image/*"
            name="productImage"
            ref={this.image}
          />

          <input
            type="submit"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            value="Добавить"
          />
        </form>
      </>
    );
  }
}
