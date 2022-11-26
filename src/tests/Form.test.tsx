import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../components/Form";
import { ContextState } from "../context";
import SuccessAlert from "../components/SuccessAlert";

jest.mock("../components/SuccessAlert");
const MockAlert = SuccessAlert as jest.Mocked<typeof SuccessAlert>;

jest.mock("../components/Card", () =>
  jest.fn(() => <div data-testid="Card" />)
);

afterEach(() => {
  jest.clearAllMocks();
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

  it("should inputTitle invalid after blur input", () => {
    const { getByPlaceholderText } = render(<Form />);
    const title = getByPlaceholderText("Название продукта");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(title);
    userEvent.click(category);

    expect(screen.queryByTestId("titleError")).toBeVisible();
  });

  it("should inputCategory invalid after blur input", () => {
    const { getByPlaceholderText } = render(<Form />);
    const title = getByPlaceholderText("Название продукта");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(category);
    userEvent.click(title);

    expect(screen.queryByTestId("categoryError")).toBeVisible();
  });

  it("should inputPrice invalid after blur input", () => {
    const { getByPlaceholderText } = render(<Form />);
    const price = getByPlaceholderText("Стоимость");
    const category = getByPlaceholderText("Категория продукта");
    userEvent.click(price);
    userEvent.click(category);

    expect(screen.queryByTestId("priceError")).toBeVisible();
  });

  it("should inputDescription invalid after blur input", () => {
    const { getByPlaceholderText } = render(<Form />);
    const price = getByPlaceholderText("Стоимость");
    const description = getByPlaceholderText("Введите описание продукта");
    userEvent.click(description);
    userEvent.click(price);

    expect(screen.queryByTestId("descError")).toBeVisible();
  });

  it("should inputFile invalid after empty input file", () => {
    const { getByTestId } = render(<Form />);
    const invalidFile = new File(["hello"], "hello.tiff");
    const image = getByTestId("productImage");
    userEvent.upload(image, invalidFile);

    expect(screen.queryByTestId("imageError")).toBeVisible();
  });

  it("should upload product after submit form", async () => {
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

    expect(submit.getAttribute("disabled")).toBe("");
    userEvent.click(submit);
    expect(submit).toBeDisabled();

    expect(MockAlert).toBeCalledTimes(1);

    expect(screen.queryByTestId("Card")).not.toBeInTheDocument();
  });
});
