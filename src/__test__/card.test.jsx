import { render, screen } from "@testing-library/react";
import Card from "../components/card";
import { mockData } from "../utils/constants";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import { addToCart } from "../redux/cardSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Card Testleri", () => {
  // useDispatch in döndürdüğü dispatch methodunun sahtesini oluştur
  const dispatchMock = jest.fn();
  // useDispatch her çağrıldığında sahte dispatcı return et
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("item propuna göre veriler ekrana basılıyo mu", () => {
    render(<Card item={mockData[0]} />);
    screen.getByText(mockData[0].name);
    screen.getByText(`₺ ${mockData[0].price} / top`);
    const img = screen.getByAltText(mockData[0].name);
    expect(img).toHaveAttribute("src", mockData[0].image);
  });

  it("type seçimine göre sepete ekle butonunun görünürlük durumu değişir", async () => {
    // userEvent Kurulum
    const user = userEvent.setup();

    render(<Card item={mockData[0]} />);
    const basketBtn = screen.getByRole("button", { name: /sepete Ekle/i });

    // ilk değeri görünmez mi
    expect(basketBtn).toHaveClass("invisible");

    // külahta butonunu al
    const cornetBtn = screen.getByRole("button", { name: "Külahta" });

    // külahta butonuna tıkla
    await user.click(cornetBtn);
    // sepete ekle butonu görünürdür
    expect(basketBtn).not.toHaveClass("invisible");
    // külahta butonuna tıkla
    await user.click(cornetBtn);

    // sepete ekle butonu görünmezdir
    expect(basketBtn).toHaveClass("invisible");
  });

  it("sepete ekle butonuna tıklanınca aksiyon dispatch edilir", async () => {
    const user = userEvent.setup();
    render(<Card item={mockData[0]} />);
    //  külahta butonunu seç ve tıkla
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });
    await user.click(cornetBtn);
    // sepete ekle butonunu al tıkla
    const basketBtn = screen.getByRole("button", { name: /sepete/i });
    await user.click(basketBtn);
    // dispatch in çağrıldığını doğrula
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    // doğru aksiyon ve payload ile çağrıldığını doğrula
    expect(dispatchMock).toHaveBeenCalledWith(
      addToCart({
        item: mockData[0],
        selectedType: "cornet",
      })
    );
  });
});
