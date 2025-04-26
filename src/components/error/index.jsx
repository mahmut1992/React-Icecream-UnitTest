import React from "react";

const Error = ({ info }) => {
  return (
    <div dattestid="error" className="my-40 text-center">
      <p>Üzgünüz bir sorun oluştu.Tekrar deneyiniz.</p>
      <p className="my-10"> {info} </p>
    </div>
  );
};

export default Error;
