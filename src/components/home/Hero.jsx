import React from "react";
import CTABtn from "../CTABtn";
import useResponsiveContent from "../../hooks/useResponsiveContent";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
    const {isDesktop} = useResponsiveContent()
  return (
    <div className={`flex ${!isDesktop ? 'flex-col gap-20' : ''} items-start justify-between px-mobSectionPad pt-12 md:px-sectionPad md:pt-[5rem] overflow-x-hidden`}>
      <div className="flex flex-col items-start gap-[2.5rem] md:gap-[3.9rem] md:mt-[5rem]">
          <h1 className="font-medium text-[5.25rem] md:text-[6.5rem] leading-[124.8%] font-poppins text-forestGreen">
            Book & <br />
            Go
          </h1>
          <p className="font-bold">
            Experience the freedom of instant rides.
            <br />
            No more waiting—just book and go.
          </p>
        <CTABtn action={() => navigate('/makeorder')}/>
      </div>
      <div>
        <img src="./Hero-image.png" alt="Hero-image" className="md:translate-x-[6rem]" />
      </div>
    </div>
  );
}

export default Hero;
