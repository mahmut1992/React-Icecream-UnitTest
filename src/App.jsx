import React from "react";
import Home from "./pages/home";
import Header from "./components/header";

const App = () => {
  return (
    <div className="min-h-screen bg-red-700 text-white py-[30px] px-[5%] ">
      <Header />
      <Home />
    </div>
  );
};

export default App;
