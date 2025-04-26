import React from "react";
import { FaStar } from "react-icons/fa";

const HeroCard = () => {
  return (
    <div>
      <div className="flex gap-[23px] ">
        <div className="bg-white p-[30px_25px_40px_30px] rounded-2xl text-black">
          <div className="flex gap-[20px]">
            <img src="/profile.png" alt="profile" className="" />
            <div>
              <h3 className="text-[24px] font-semibold ">Fırat</h3>
              <div className="flex gap-1 text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          </div>
          <p className="mt-[15px] lg:max-w-[300px] ">
            Karşı konulamaz dondurma lezzetlerimizle donmuş mutluluğun tadını
            çıkar!!
          </p>
        </div>
        <img src="/dots.svg" alt="dots" />
      </div>
      <div className="mt-[40px] lg:mt-[83px] ">
        <h3 className="fs-5 mb-[15px] font-medium ">Kategori Seçiniz</h3>
        <div className="flex gap-[40px] ">
          <button className="card-btn">
            <img src="/icon-3.svg" alt="" />
          </button>
          <button className="card-btn">
            <img src="/icon-2.svg" alt="" />
          </button>
          <button className="card-btn">
            <img src="/icon-1.svg" alt="" />
          </button>
          <button className="card-btn">
            <img src="/icon-4.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
