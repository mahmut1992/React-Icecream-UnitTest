// sadece bu olsun
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CardInfo from "../components/modal/CardInfo";
import { clearCart } from "../redux/cardSlice";

// Mock'ları oluşturuyoruz
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock("../redux/cardSlice", () => ({
  clearCart: jest.fn(),
}));

describe("CardInfo Component", () => {
  const mockDispatch = jest.fn();
  const mockClose = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  test("Boş sepet durumunda fiyatları doğru göstermeli", () => {
    render(<CardInfo cart={[]} close={mockClose} />);

    expect(screen.getByText("AraToplam")).toBeInTheDocument();
    const zeroPriceElements = screen.getAllByText(/₺\s*0/);
    expect(zeroPriceElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Kargo")).toBeInTheDocument();
    expect(screen.getByText("₺0")).toBeInTheDocument();
    expect(screen.getByText("Toplam")).toBeInTheDocument();

    // Boş sepette buton devre dışı olmalı
    const orderButton = screen.getByText("Sipariş Ver");
    expect(orderButton).toBeDisabled();
  });

  test("Ürünlerle dolu sepet için fiyat hesaplamalarını doğru yapmalı (kargo ücretsiz)", () => {
    const mockCart = [
      { id: 1, name: "Ürün 1", price: 50, amount: 2 },
      { id: 2, name: "Ürün 2", price: 30, amount: 1 },
    ];

    render(<CardInfo cart={mockCart} close={mockClose} />);

    // AraToplam ve Toplam ayrı ayrı kontrol edilmeli
    const priceElements = screen.getAllByText(/₺\s*130/);
    expect(priceElements.length).toBe(2); // Biri AraToplam diğeri Toplam için
    expect(screen.getByText("Ücretsiz")).toBeInTheDocument();
  });

  test("100TL altındaki sepet için kargo ücretini eklemeli", () => {
    const mockCart = [
      { id: 1, name: "Ürün 1", price: 40, amount: 1 },
      { id: 2, name: "Ürün 2", price: 30, amount: 1 },
    ];

    render(<CardInfo cart={mockCart} close={mockClose} />);

    // AraToplam: 40 + 30 = 70
    expect(screen.getByText(/₺\s*70/)).toBeInTheDocument();
    expect(screen.getByText(/₺20/)).toBeInTheDocument();
    // Toplam: 70 + 20 = 90
    expect(screen.getByText(/₺\s*90/)).toBeInTheDocument();
  });

  test("Sipariş Ver butonuna tıklandığında doğru işlemleri yapmalı", () => {
    const mockCart = [{ id: 1, name: "Ürün 1", price: 50, amount: 2 }];

    render(<CardInfo cart={mockCart} close={mockClose} />);

    const orderButton = screen.getByText("Sipariş Ver");
    expect(orderButton).not.toBeDisabled();

    fireEvent.click(orderButton);

    // Beklenen işlemler doğrulanıyor
    expect(toast.success).toHaveBeenCalledWith("Sipariş Oluşturuldu");
    expect(clearCart).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(clearCart());
    expect(mockClose).toHaveBeenCalled();
  });

  test("Toplam fiyat hesaplaması doğru olmalı", () => {
    const mockCart = [
      { id: 1, name: "Ürün 1", price: 50, amount: 1 },
      { id: 2, name: "Ürün 2", price: 25, amount: 2 },
    ];
    // AraToplam: 50*1 + 25*2 = 100
    // Kargo: Ücretsiz (100 TL ve üzeri)
    // Toplam: 100

    render(<CardInfo cart={mockCart} close={mockClose} />);

    // Toplam fiyat kontrolü - getAllByText kullanarak birden fazla element gelme durumunda hata oluşmasını engelliyoruz
    const priceElements = screen.getAllByText(/₺\s*100/);
    expect(priceElements.length).toBe(2); // Biri AraToplam, diğeri Toplam için
  });
});
