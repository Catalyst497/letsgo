import React from "react";
import Nav from "../components/Nav";
import Main from "../components/makeorder/Main";
import Footer from "../components/Footer";

function MakeOrder() {
  return (
    <>
      <Nav active={"Book A Ride"} />
      <Main />
      <Footer />
    </>
  );
}

export default MakeOrder;
