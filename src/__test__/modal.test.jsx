import CartItem from "../components/modal/CartItem";
import CardInfo from "../components/modal/CardInfo";
import { useSelector } from "react-redux";
import { queryByTestId, render, screen } from "@testing-library/react";
import Modal from "../components/modal";
import userEvent from "@testing-library/user-event";
import { mockCartData } from "../utils/constants";

// useSelector mock

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// cartInfo ve CartItem componentleri Model içerisinde kullanıldığı ve dispatch vs metotları içerebileceği ve bunların modal testlerini etkilemesini istemediğimiz için mock layalım

jest.mock("../components/modal/CartItem", () => ({ item }) => (
  <h1>{item.name} </h1>
));

jest.mock("../components/modal/CardInfo", () => () => <h1>Card Info</h1>);

describe("Modal Component", () => {
  const closeMock = jest.fn();
  it("isOpen propuna göre Modal ekrana basılır", () => {
    // useSelector çağrılınca bunu retur etsin
    useSelector.mockReturnValue({ cart: [] });
    // bileşeni renderla
    const { rerender, container, queryByTestId, getByTestId } = render(
      <Modal isOpen={false} close={closeMock} />
    );
    // Modalın olmadığını kontrol et
    expect(screen.queryByTestId("modal")).toBeNull();

    // bileşeni tekrar render et ama isOpen true ver
    rerender(<Modal isOpen={true} close={closeMock} />);

    // modal ekranda var mı

    getByTestId("modal");
  });
  it("X butonuna tıklayınca close fonksiyonu çalışır", async () => {
    // userEvent kur

    const user = userEvent.setup();
    // useSelector çağrılınca bunu retur etsin
    useSelector.mockReturnValue({ cart: [] });
    render(<Modal isOpen={true} close={closeMock} />);
    // X butonunu seç
    const closeBtn = screen.getByTestId("close");

    // butona tıkla
    await user.click(closeBtn);
    // close fonk çalıştımı
    expect(closeMock).toHaveBeenCalled();
  });
  it("Sepet boş ise ekrana uyarı basılır", () => {
    // useSelector çağrılınca bunu retur etsin
    useSelector.mockReturnValue({ cart: [] });
    const { rerender } = render(<Modal isOpen={true} close={closeMock} />);
    // ekranda uyarı mesajı vardır
    screen.getByText(/sepette/i);
    // bileşeni tekrar renderla ama bu sefer useSelector çağrıldığında boş dizi gönderme
    useSelector.mockReturnValue({ cart: mockCartData });
    rerender(<Modal isOpen={true} close={closeMock} />);
    // ekranda uyarı mesajı yoktur
    expect(screen.queryByText(/sepette/i)).toBeNull();
  });
  it("Sepet dolu ise her bir eleman için ekrana kart basılır", () => {
    // useSelector çağrılınca bunu retur etsin
    useSelector.mockReturnValue({ cart: mockCartData });
    render(<Modal isOpen={true} close={closeMock} />);
    // ekrandaki item.name var mı kontrol et
    mockCartData.forEach((item) => screen.getByText(item.name));
  });
});
