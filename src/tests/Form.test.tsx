import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../components/Form";
import { ContextState } from "../context";

const mockData = jest.fn((title, category, price, description, image) => {
  return Promise.resolve({ title, category, price, description, image });
});

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

  it("should inputTitle invalid after blur input", async () => {
    const { getByPlaceholderText } = render(<Form />);
    const title = getByPlaceholderText("Название продукта");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(title);
    userEvent.click(category);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(await screen.findByText("Поле не заполнено")).toBeInTheDocument();
  });

  it("should inputCategory invalid after blur input", async () => {
    const { getByPlaceholderText } = render(<Form />);
    const title = getByPlaceholderText("Название продукта");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(category);
    userEvent.click(title);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(await screen.findByText("Поле не заполнено")).toBeInTheDocument();
  });

  it("should inputPrice invalid after blur input", async () => {
    const { getByPlaceholderText } = render(<Form />);
    const price = getByPlaceholderText("Стоимость");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(price);
    userEvent.click(category);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(await screen.findByText("Поле не заполнено")).toBeInTheDocument();
  });

  it("should inputDescription invalid after blur input", async () => {
    const { getByPlaceholderText } = render(<Form />);
    const price = getByPlaceholderText("Стоимость");
    const description = getByPlaceholderText("Введите описание продукта");
    userEvent.click(description);
    userEvent.click(price);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(await screen.findByText("Поле не заполнено")).toBeInTheDocument();
  });

  it("should inputFile invalid after empty input file", async () => {
    const { getByTestId } = render(<Form />);
    const invalidFile = new File(["hello"], "hello.tiff");
    const image = getByTestId("productImage");
    userEvent.upload(image, invalidFile);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(await screen.findByText("Картинка не выбрана!")).toBeInTheDocument();
  });

  it("should upload product after submit form", async () => {
    jest.useFakeTimers({ timerLimit: 5000 });
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

    jest.runAllTimers();
    await waitFor(() => {
      expect(screen.queryAllByRole("alert")).toHaveLength(1);
      expect(screen.getByTestId("successAlert")).toHaveClass("opacity-0");
      expect(screen.findByTestId("Card")).toBeInTheDocument();
    });
    expect(screen.getAllByDisplayValue("")).toHaveLength(1);
  });
});
