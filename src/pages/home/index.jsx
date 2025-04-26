import React from "react";
import Hero from "../../components/hero";
import CartButton from "../../components/button/CartButton";
import TrendButton from "../../components/button/TrendButton";
import List from "../../components/list";

const Home = () => {
  return (
    <div>
      <Hero />
      <CartButton />
      <TrendButton />
      <List />
    </div>
  );
};

export default Home;
