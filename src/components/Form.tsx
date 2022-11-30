import React, { useRef, useEffect } from "react";
import { useMyContext } from "../hook/useMyContext";
import Card from "./Card";
import SuccessAlert from "./SuccessAlert";
import { useForm, SubmitHandler } from "react-hook-form";

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

const inputValidClasses =
  " focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const inputInvalidClasses =
  " focus:border-pink-500 focus:ring-pink-500 border-pink-500 text-pink-600";

const inputDefaultClasses =
  "mb-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5";

const inputClasses = {
  normalClasses: inputDefaultClasses + inputValidClasses,
  errorClasses: inputDefaultClasses + inputInvalidClasses,
};

type Inputs = {
  title: string;
  category: string;
  price: number | null;
  description: string;
  image: FileList | null;
};

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm<Inputs>({
    mode: "onTouched",
  });

  const imageRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...rest } = register("image", {
    required: "Картинка не выбрана!",
    validate: (value) => {
      return (
        /\.(?:jpe?g|png)$/.test(value![0].name) ||
        "Выберите фаил формата (jpeg, jpg, png)!"
      );
    },
  });

  const { state, dispatch } = useMyContext();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const id = Date.now();

    fileReader.onloadend = () => {
      const imageSrc = fileReader.result as string;
      dispatch({
        type: "addProduct",
        payload: {
          id,
          title: data.title,
          price: Number(data.price),
          description: data.description,
          category: data.category,
          image: imageSrc,
        },
      });
    };

    fileReader.readAsDataURL(imageRef.current?.files?.item(0) as File);
  };

  useEffect(() => {
    isSubmitted && reset();
  }, [isSubmitted, reset]);

  const { normalClasses, errorClasses } = inputClasses;

  return (
    <div className="container m-auto">
      <h1 className="mt-5 mb-7 text-center text-4xl font-bold dark:text-white">
        Форма добавления
      </h1>
      <form
        id="form"
        className="mb-4 w-1/3 m-auto"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
      >
        <div className="relative">
          <input
            placeholder="Название продукта"
            type="text"
            id="title"
            {...register("title", {
              required: true,
              pattern: {
                value: /^[A-Za-zА-Яа-яЁё0-9]{3,16}$/,
                message: "Введите 3-16 символов, кроме специальных.",
              },
            })}
            data-testid="productTitle"
            className={!errors.title ? normalClasses : errorClasses}
          />
          <div
            role="alert"
            data-testid="titleError"
            className={
              !errors.title
                ? "invisible absolute"
                : "text-sm text-red-600 dark:text-red-500 absolute top-[45px] left-[10px] visible"
            }
          >
            {errors?.title && (
              <span>
                <strong>Ошибка!</strong>{" "}
                {errors.title?.message || "Поле не заполнено"}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            placeholder="Категория продукта"
            type="text"
            id="category"
            data-testid="productCategory"
            className={!errors.category ? normalClasses : errorClasses}
            {...register("category", {
              required: true,
              pattern: {
                value: /^[A-Za-zА-Яа-яЁё0-9]{3,16}$/,
                message: "Введите 3-16 символов, кроме специальных.",
              },
            })}
          />
          <div
            role="alert"
            data-testid="categoryError"
            className={
              !errors.category
                ? "invisible absolute"
                : "text-sm text-red-600 dark:text-red-500 absolute top-[45px] left-[10px] visible"
            }
          >
            {errors?.category && (
              <span>
                <strong>Ошибка!</strong>{" "}
                {errors.category?.message || "Поле не заполнено"}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            placeholder="Стоимость"
            type="text"
            id="price"
            {...register("price", {
              required: true,
              pattern: {
                value: /^\d{1,8}$/g,
                message: "Введите 1-8 цифр.",
              },
            })}
            data-testid="productPrice"
            className={!errors.price ? normalClasses : errorClasses}
          />
          <p
            role="alert"
            data-testid="priceError"
            className={
              !errors.price
                ? "invisible absolute"
                : "text-sm text-red-600 dark:text-red-500 absolute top-[45px] left-[10px] visible"
            }
          >
            {errors?.price && (
              <span>
                <strong>Ошибка!</strong>{" "}
                {errors.price?.message || "Поле не заполнено"}
              </span>
            )}
          </p>
        </div>

        <div className="relative">
          <textarea
            id="message"
            rows={8}
            {...register("description", {
              maxLength: {
                value: 800,
                message: "Длина текста превышена!",
              },
              minLength: {
                value: 8,
                message: "Напишите минимум 8 символов!",
              },
              required: true,
            })}
            className={
              !errors.description
                ? textareaInputStyles.normalInput
                : textareaInputStyles.errorInput
            }
            placeholder="Введите описание продукта"
            data-testid="productDescription"
          />
          <p
            role="alert"
            data-testid="descError"
            className={
              !errors.description
                ? "invisible absolute"
                : "text-sm text-red-600 dark:text-red-500 absolute top-[185px] left-[10px] visible"
            }
          >
            {errors?.description && (
              <span>
                <strong>Ошибка!</strong>{" "}
                {errors.description?.message || "Поле не заполнено"}
              </span>
            )}
          </p>
        </div>

        <div className="relative">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="file_input"
          >
            Загрузить картинку
          </label>
          <input
            className={
              !errors.image
                ? fileInputStyles.normalFileInput
                : fileInputStyles.errorFileInput
            }
            id="file_input"
            type="file"
            accept="image/*"
            {...rest}
            name="image"
            ref={(e) => {
              ref(e);
              imageRef.current = e;
            }}
            data-testid="productImage"
          />
          <p
            role="alert"
            data-testid="imageError"
            className={
              !errors.image
                ? "invisible absolute"
                : "text-sm text-red-600 dark:text-red-500 absolute top-[75px] left-[10px] visible"
            }
          >
            {errors?.image && (
              <span>
                <strong>Ошибка!</strong> {errors.image?.message}
              </span>
            )}
          </p>
        </div>

        <input
          type="submit"
          name="submit"
          className={isValid ? buttonStyles.active : buttonStyles.disabled}
          value="Добавить"
          disabled={isValid ? false : true}
          data-testid="submit"
        />
      </form>
      <SuccessAlert isSubmitted={isSubmitted} />
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {state.products &&
          state.products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Form;
