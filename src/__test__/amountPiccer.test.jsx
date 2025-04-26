import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import AmountPicker from "../components/modal/AmountPicker";
import userEvent from "@testing-library/user-event";
import { addToCart, deleteFromCart } from "../redux/cardSlice";

// useDispatch mock
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
const cartItem = {
  name: "Bal Badem",
  image: "/ice-1.png",
  price: 25,
  id: "ebab",
  type: "cup",
  amount: 2,
};

describe("AmountPicker", () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Bileşen item.amount değerini doğru render eder", () => {
    render(<AmountPicker item={cartItem} />);
    screen.getByText(cartItem.amount);
  });
  it("- butonuna tıklanınca deleteFromCart dispatch edilir", async () => {
    const user = userEvent.setup();
    render(<AmountPicker item={cartItem} />);
    const btn = screen.getByRole("button", { name: "-" });
    await user.click(btn);
    expect(mockDispatch).toHaveBeenCalledWith(
      deleteFromCart({ item: cartItem })
    );
  });
  it("+ butonuna tıklanınca addToCart dispatch edilir", async () => {
    const user = userEvent.setup();
    render(<AmountPicker item={cartItem} />);
    const btn = screen.getByRole("button", { name: "+" });

    await user.click(btn);
    expect(mockDispatch).toHaveBeenCalledWith(
      addToCart({ item: cartItem, selectedType: cartItem.type })
    );
  });
});
