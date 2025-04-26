import { render, screen } from "@testing-library/react";
import CartItem from "../components/modal/CartItem";
import AmountPicker from "../components/modal/AmountPicker";

jest.mock("../components/modal/AmountPicker", () => () => <h1>Piccer</h1>);

const cupItem = {
  name: "Bal Badem",
  image: "/ice-1.png",
  price: 25,
  id: "ebab",
  type: "cup",
  amount: 2,
};
const cornetItem = {
  name: "Bal Badem",
  image: "/ice-1.png",
  price: 25,
  id: "ebab",
  type: "cornet",
  amount: 1,
};

it("item type 'cup' olduğunda doğru render ediliyor  ", () => {
  render(<CartItem item={cupItem} />);
  // resmin doğru render edildiğini kontrol et
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", cupItem.image);
  // type yazısı doğrumu
  screen.getByText("Bardakta");
  // toplam fiyatı doğrumu
  screen.getByText(`₺ ${cupItem.price * cupItem.amount}`);
});
it("item type 'cornet' olduğunda doğru render ediliyor  ", () => {
  render(<CartItem item={cornetItem} />);
  // resmin doğru render edildiğini kontrol et
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", cornetItem.image);
  // type yazısı doğrumu
  screen.getByText("Külahta");
  // toplam fiyatı doğrumu
  screen.getByText(`₺ ${cornetItem.price * cornetItem.amount}`);
});
