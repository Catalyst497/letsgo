import React from "react";
import Nav from "../components/Nav";
import Hero from "../components/home/Hero";
import AboutUs from "../components/home/AboutUs";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AboutUs />
      <Testimonials />
      <Footer />
    </main>
  );
}

export default Home;
