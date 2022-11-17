import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../components/Form";
import { ContextState } from "../context";

describe("Form", () => {
  it("should render Form", () => {
    render(<Form />);
    expect(screen.getByText(/Форма/)).toBeInTheDocument();
  });

  it("should input title", () => {
    const { getByPlaceholderText } = render(<Form />);
    const title = getByPlaceholderText("Название продукта");
    userEvent.type(title, "title");
    expect(screen.getByDisplayValue("title")).toBeInTheDocument();
  });

  it("should input category", () => {
    const { getByPlaceholderText } = render(<Form />);
    const category = getByPlaceholderText("Категория продукта");
    userEvent.type(category, "category");
    expect(screen.getByDisplayValue("category")).toBeInTheDocument();
  });

  it("should input price", () => {
    const { getByPlaceholderText } = render(<Form />);
    const price = getByPlaceholderText("Стоимость");
    userEvent.type(price, "200");
    expect(screen.getByDisplayValue("200")).toBeInTheDocument();
  });

  it("should input description", () => {
    const { getByPlaceholderText } = render(<Form />);
    const description = getByPlaceholderText("Введите описание продукта");
    userEvent.type(description, "description");
    expect(screen.getByDisplayValue("description")).toBeInTheDocument();
  });

  it("should input image", () => {
    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const { getByTestId } = render(<Form />);
    const image = getByTestId("productImage") as HTMLInputElement;

    userEvent.upload(image, file);

    expect(image.files?.item(0)).toStrictEqual(file);
    expect(image.files?.length).toBe(1);
  });

  it("should inputTitle invalid after invalid input text", () => {
    const { getByPlaceholderText } = render(<Form />);
    const title = getByPlaceholderText("Название продукта");
    userEvent.type(title, "test!");

    expect(title).toBeInvalid();
  });

  it("should inputTitle invalid after blur input", () => {
    const { getByPlaceholderText } = render(<Form />);
    const title = getByPlaceholderText("Название продукта");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(title);
    userEvent.click(category);

    expect(title).toBeInvalid();
  });

  it("should inputCategory invalid after invalid input text", () => {
    const { getByPlaceholderText } = render(<Form />);
    const category = getByPlaceholderText("Категория продукта");
    userEvent.type(category, "test!");

    expect(category).toBeInvalid();
  });

  it("should inputCategory invalid after blur input", () => {
    const { getByPlaceholderText } = render(<Form />);
    const title = getByPlaceholderText("Название продукта");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(category);
    userEvent.click(title);

    expect(category).toBeInvalid();
  });

  it("should inputPrice invalid after invalid input text", () => {
    const { getByPlaceholderText } = render(<Form />);
    const price = getByPlaceholderText("Стоимость");
    userEvent.type(price, "test!");

    expect(price).toBeInvalid();
  });

  it("should inputPrice invalid after blur input", () => {
    const { getByPlaceholderText } = render(<Form />);
    const price = getByPlaceholderText("Стоимость");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(price);
    userEvent.click(category);

    expect(price).toBeInvalid();
  });

  it("should inputDescription invalid after invalid input text", () => {
    const { getByPlaceholderText } = render(<Form />);
    const description = getByPlaceholderText("Введите описание продукта");
    userEvent.type(description, "test");
    userEvent.clear(description);

    expect(description).toHaveClass("border-pink-500");
  });

  it("should inputDescription invalid after blur input", () => {
    const { getByPlaceholderText } = render(<Form />);
    const price = getByPlaceholderText("Стоимость");
    const description = getByPlaceholderText("Введите описание продукта");
    userEvent.click(description);
    userEvent.click(price);

    expect(description).toHaveClass("border-pink-500");
  });

  it("should inputFile invalid after empty input file", () => {
    const { getByTestId } = render(<Form />);
    const image = getByTestId("productImage");

    fireEvent.change(image, { target: { files: [] } });

    expect(image).toHaveClass("text-pink-600");
  });

  it("should inputs required after submit if value empty else pattern incorrect", async () => {
    const { getByTestId, findByTestId } = render(<Form />);
    const title = getByTestId("productTitle");
    const titleError = getByTestId("titleError");

    const category = getByTestId("productCategory");
    const categoryError = getByTestId("categoryError");

    const price = getByTestId("productPrice");
    const priceError = getByTestId("priceError");

    const description = findByTestId("productDescription");
    const descError = findByTestId("descError");

    const image = getByTestId("productImage");
    const submit = getByTestId("submit");

    userEvent.type(category, "test");
    userEvent.click(price);
    userEvent.clear(category);
    expect(submit).toBeEnabled();

    userEvent.click(submit);

    expect(title).toBeRequired();
    expect(title).toBeInvalid();
    expect(titleError).toBeVisible();

    expect(price).toBeRequired();
    expect(price).toBeInvalid();
    expect(priceError).toBeVisible();

    expect(category).toBeRequired();
    expect(category).toBeInvalid();
    expect(categoryError).toBeVisible();

    expect(await description).toHaveClass("border-pink-500");
    expect(await descError).toBeInTheDocument();

    expect(image).toHaveClass("border-pink-500");
    expect(submit).toBeDisabled();
  });

  it("should upload product after submit form", async () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    const { getByTestId } = render(
      <ContextState>
        <Form />
      </ContextState>
    );

    const title = getByTestId("productTitle") as HTMLInputElement;
    const category = getByTestId("productCategory") as HTMLInputElement;
    const price = getByTestId("productPrice") as HTMLInputElement;
    const description = getByTestId("productDescription") as HTMLInputElement;
    const image = getByTestId("productImage") as HTMLInputElement;
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const submit = getByTestId("submit");

    userEvent.type(title, "title");
    userEvent.type(category, "category");
    userEvent.type(price, "100");
    userEvent.type(description, "description");
    userEvent.upload(image, file);
    userEvent.click(submit);

    expect(submit).toBeDisabled();
    expect(screen.getByTestId("successAlert")).toHaveClass("opacity-100");

    jest.runAllTimers();
    await waitFor(() => {
      expect(screen.getByTestId("successAlert")).toHaveClass("opacity-0");
    });
    expect(title.value).toBe("");
    expect(category.value).toBe("");
    expect(price.value).toBe("");
    expect(description.value).toBe("");
    expect(image.value).toBe("");

    expect(screen.queryByTestId("Card")).toBeInTheDocument();

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
