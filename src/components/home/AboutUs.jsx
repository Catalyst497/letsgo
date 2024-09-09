import React from "react";
import useResponsiveContent from "../../hooks/useResponsiveContent";

function AboutUs() {
  const { isMobile, isDesktop } = useResponsiveContent();
  return (
    <section className="px-mobSectionPad md:px-sectionPad pt-[10rem] bg-bgAbout bg-cover">
      <div>
        <div className="relative z-10">
          <div className="title flex gap-4 items-center">
            <div className="line border-l-8 border-forestGreen h-[1.9rem] md:h-[2.75rem] "></div>
            <div className="text-forestGreen font-poppins font-semibold text-[1.9rem] md:text-[2.75rem]">
              Who We Are
            </div>
          </div>
          <div className="text pl-6">
            At Let's GO, we believe in the freedom of instant travel. Our
            mission is to make
            {isDesktop && <br />}
            booking a bus ride as quick and simple as a tap on your phone—so you
            can {isDesktop && <br />}
            get where you need to go, without the wait.
          </div>
        </div>
        {isDesktop && (
          <div className="image flex justify-end mt-[-13rem] relative">
            <img src="./girl-sitting.png" alt="" />
          </div>
        )}
      </div>
      <div>
        {isDesktop && (
          <div className="image flex justify-start mt-[-13rem] relative ">
            <img src="./bro.png" className="" alt="" />
          </div>
        )}
        <div className={`relative z-10 ${isDesktop ? "-mt-4" : "mt-[6rem]"}`}>
          <div className="title flex justify-end gap-4 items-center">
            <div className="text-forestGreen font-poppins font-semibold text-[1.9rem] md:text-[2.75rem]">
              Our Mission
            </div>
            <div className="line border-l-8 border-forestGreen h-[1.9rem] md:h-[2.75rem] "></div>
          </div>
          <div className="text pr-6 text-end">
            We understand that time is valuable, which is why our platform is
            designed
            {isDesktop && <br />}
            to eliminate the hassle of scheduling and waiting for
            transportation. Our goal is to provide
            {isDesktop && <br />}a seamless and efficient experience that gets you on the road
            the moment you’re ready.
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
