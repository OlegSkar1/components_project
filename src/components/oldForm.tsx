import React, { Component, createRef } from "react";
import { Context, ContextInterface } from "../context";
import Card from "./Card";
import SuccessAlert from "./SuccessAlert";

const fileReader = new FileReader();

const buttonStyles = {
  disabled:
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center",
  active:
    "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
};

const textareaInputStyles = {
  normalInput:
    "block mb-7 resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  errorInput:
    "block mb-7 resize-none p-2.5 w-full text-sm bg-gray-50 rounded-lg border dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  focus:border-pink-500 focus:ring-pink-500 border-pink-500 text-pink-600",
};

const fileInputStyles = {
  normalFileInput:
    "block mb-7 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
  errorFileInput:
    "block mb-7 w-full text-sm text-pink-600 bg-gray-50 rounded-lg border border-pink-500 cursor-pointer  focus:outline-none dark:bg-gray-700  dark:placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500",
};

interface IFormState {
  isActive: boolean;
  isError: boolean;
  isDescError: boolean;
  isUploaded: boolean;
}
export default class Form extends Component<unknown, IFormState> {
  static contextType = Context;

  title = createRef<HTMLInputElement>();
  category = createRef<HTMLInputElement>();
  price = createRef<HTMLInputElement>();
  description = createRef<HTMLTextAreaElement>();
  image = createRef<HTMLInputElement>();
  submit = createRef<HTMLInputElement>();
  form = createRef<HTMLFormElement>();

  state = {
    isActive: false,
    isError: false,
    isDescError: false,
    isUploaded: false,
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    this.setState({ isActive: false, isUploaded: false });
    const { addProduct } = this.context as ContextInterface;

    const title = this.title.current;
    const image = this.image.current;
    const description = this.description.current;
    const price = this.price.current;
    const category = this.category.current;
    const id = Date.now();
    if (!title?.value) {
      title!.required = true;
    }
    if (!category?.value) {
      category!.required = true;
    }
    if (!price?.value) {
      price!.required = true;
    }
    if (!description?.value) {
      this.setState({ isDescError: true });
    }
    if (!image?.files?.item(0)) {
      this.setState({ isError: true });
    }

    if (
      title?.validity.valid &&
      image?.files?.item(0) &&
      description?.validity.valid &&
      price?.validity.valid &&
      category?.validity.valid
    ) {
      fileReader.onloadend = async () => {
        addProduct({
          id,
          title: title!.value,
          category: category.value,
          description: description.value,
          price: Number(price.value),
          image: fileReader.result as string,
        });

        title.required = false;
        category.required = false;
        price.required = false;

        this.form.current?.reset();
      };
      fileReader.readAsDataURL(image?.files?.item(0) as File);
      this.setState({ isUploaded: true });
      setTimeout(() => {
        this.setState({ isUploaded: false });
      }, 2500);
    }
  };

  handleBlur: React.FormEventHandler<HTMLFormElement> = (e) => {
    const event = e.target as HTMLFormElement;
    switch (event.name) {
      case event.name.match(/(productTitle)|(productCategory)/)
        ? event.name
        : true:
        {
          if (!event.value || event.value.length < 3) {
            event.required = true;
            event.pattern = "^[A-Za-zА-Яа-яЁё0-9]{3,16}$";
          }
        }
        break;
      case "productPrice":
        {
          if (!event.value) {
            event.required = true;
            event.pattern = "^[0-9]{1,8}$";
          }
        }
        break;
      case "productDescription":
        {
          if (event.value.length < 8) {
            this.setState({ isDescError: true });
          }
        }
        break;
    }
  };

  handleChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    this.setState({ isActive: true });
    const event = e.target as HTMLFormElement;
    switch (event.name) {
      case event.name.match(/(productTitle)|(productCategory)/)
        ? event.name
        : true:
        {
          if (event.value.length > 2) {
            event.required = true;
            event.pattern = "^[A-Za-zА-Яа-яЁё0-9s ]{3,16}$";
          }
        }
        break;
      case "productPrice":
        {
          if (event.value) {
            event.required = true;
            event.pattern = "^[\\d]{1,8}$";
          }
        }
        break;
      case "productDescription":
        {
          if (event.value.length >= 8) {
            this.setState({ isDescError: false });
          }
          if (!event.value) {
            this.setState({ isDescError: true });
          }
        }
        break;
      case "productImage":
        {
          if (event.files[0]) {
            this.setState({ isError: false });
          } else this.setState({ isError: true });
        }
        break;
    }
  };

  render() {
    const { isActive, isError, isDescError, isUploaded } = this.state;
    const { active, disabled } = buttonStyles;
    const { normalInput, errorInput } = textareaInputStyles;
    const { normalFileInput, errorFileInput } = fileInputStyles;

    const { products } = this.context as ContextInterface;

    return (
      <div className="container m-auto">
        <h1 className="mt-5 mb-7 text-center text-4xl font-bold dark:text-white">
          Форма добавления
        </h1>
        <form
          noValidate
          id="form"
          ref={this.form}
          className="mb-4 w-1/3 m-auto"
          onSubmit={this.handleSubmit}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          data-testid="form"
        >
          <div className="relative">
            <input
              placeholder="Название продукта"
              type="text"
              id="title"
              name="productTitle"
              data-testid="productTitle"
              ref={this.title}
              className="peer mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 invalid:border-pink-500 invalid:text-pink-600"
            />
            <p
              data-testid="titleError"
              className="text-sm text-red-600 dark:text-red-500 absolute top-[45px] left-[10px] invisible peer-invalid:visible "
            >
              <span className="font-medium">Ошибка!</span> Введите 3-16
              символов, кроме специальных
            </p>
          </div>

          <div className="relative">
            <input
              placeholder="Категория продукта"
              type="text"
              id="category"
              name="productCategory"
              data-testid="productCategory"
              ref={this.category}
              className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 invalid:border-pink-500 invalid:text-pink-600 peer"
            />
            <p
              data-testid="categoryError"
              className="text-sm text-red-600 dark:text-red-500 absolute top-[45px] left-[10px] invisible peer-invalid:visible "
            >
              <span className="font-medium">Ошибка!</span> Введите 3-16 символов
            </p>
          </div>

          <div className="relative">
            <input
              placeholder="Стоимость"
              type="text"
              id="price"
              ref={this.price}
              name="productPrice"
              data-testid="productPrice"
              className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 invalid:border-pink-500 invalid:text-pink-600 peer"
            />
            <p
              data-testid="priceError"
              className="text-sm text-red-600 dark:text-red-500 absolute top-[45px] left-[10px] invisible peer-invalid:visible "
            >
              <span className="font-medium">Ошибка!</span> Введите 1-8 цифр
            </p>
          </div>

          <div className="relative">
            <textarea
              id="message"
              rows={8}
              ref={this.description}
              name="productDescription"
              maxLength={800}
              minLength={8}
              className={isDescError ? errorInput : normalInput}
              placeholder="Введите описание продукта"
              data-testid="productDescription"
            />
            {isDescError && (
              <p
                data-testid="descError"
                className="text-sm text-red-600 dark:text-red-500 absolute top-[185px] left-[10px] "
              >
                <span className="font-medium">Ошибка!</span> Введите 8-40
                символов
              </p>
            )}
          </div>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="file_input"
          >
            Загрузить картинку
          </label>
          <input
            className={isError ? errorFileInput : normalFileInput}
            id="file_input"
            type="file"
            accept="image/*"
            name="productImage"
            ref={this.image}
            data-testid="productImage"
          />

          <input
            type="submit"
            name="submit"
            className={isActive ? active : disabled}
            value="Добавить"
            disabled={isActive ? false : true}
            ref={this.submit}
            data-testid="submit"
          />
        </form>
        {/* <SuccessAlert isUploaded={isUploaded} /> */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {products &&
            products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
        </div>
      </div>
    );
  }
}
