import { render, screen, waitFor } from "@testing-library/react";
import { api } from "../utils/api";
import List from "../components/list";
import Card from "../components/card";
import { mockData } from "../utils/constants";

// api modulunu mockla
jest.mock("../utils/api");

// card componontunu mockla: çünkü redux vs kullanacaz List componenti de bundan etkilenmesin provider vsvs
jest.mock("../components/card");

describe("List bileşeni testleri", () => {
  // her testden sonra mock ayarlarını sıfırla
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("api dan cevap gelmediyse ekrana loader basılır", async () => {
    // api isteği atılınca dönecek cevap
    api.get.mockResolvedValueOnce({ data: [] });
    // bileşeni renderla
    render(<List />);
    // ekranda loader vardır
    screen.getByTestId("loader");
    // belirli bir süre ardından ekrandan loader gider
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).toBeNull();
    });
  });
  it("api dan hata gelirse ekrana error basılır", async () => {
    api.get.mockRejectedValueOnce(new Error("hata oluştu"));
    render(<List />);
    await expect(waitFor(() => screen.getByTestId("error")));
  });
  it("api dan veri gelirse ekrana card basılır", async () => {
    // cardların yerine basılack içeriği belirle
    Card.mockImplementation(({ item }) => <div>{item.name} </div>);

    // api isteği atılınca verileri döndür

    api.get.mockResolvedValueOnce({ data: mockData });

    render(<List />);

    await waitFor(() => {
      mockData.forEach((item) => {
        screen.getByText(item.name);
      });
    });
  });
});
