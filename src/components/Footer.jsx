import React from "react";
import useResponsiveContent from "../hooks/useResponsiveContent";

function Footer() {
  const { isMobile, isDesktop } = useResponsiveContent();
  return (
    <footer className="bg-[#333333] pt-12 md:pt-16 text-lightGray">
      <div
        className={`footer-main w-full flex ${
          !isDesktop ? "flex-col gap-10" : ""
        } justify-between px-mobSectionPad md:px-sectionPad`}
      >
        <div className="flex flex-col gap-32">
          <div>
            {isDesktop ? (
              <img src="./footer-logo.png" alt="logo" />
            ) : (
              <img src="./mobile-footer-logo.png" alt="logo" />
            )}
          </div>
          {isDesktop && (
            <div>
              Lorem ipsum dolor sit amet consectetur <br />
              adipisicing elit. Maxime mollitia,
              <br />
              molestiae quas vel sint commodi repudiandae <br />
              consequuntur voluptatum laborum
            </div>
          )}
        </div>
        <div className={`flex flex-col justify-between ${!isDesktop ? "gap-6" : ""}`}>
          <div className="flex flex-col gap-2 md:gap-6">
            <div className={`${!isDesktop ? "text-[21px] text-white" : ''}`}>Contact Us</div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center ">
                <img src="./phone-icon.svg" className={!isDesktop ? "w-[19px]" : ""} alt="phone" />{" "}
                <div className="text-[19px]">+1234567890987</div>
              </div>
              <div className="flex gap-4 items-center">
                <img src="./mail-icon.png" className={!isDesktop ? "w-[19px]" : "h-8"} alt="mail" />
                <div className="text-[19px]">letsgo@info.com</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className={`${!isDesktop ? "text-[21px] text-white" : ''}`}>Socials</div>
            <div className="flex gap-4">
              <img src="./instagram-icon.png" className={!isDesktop ? "w-[19px] h-[19px]" : "h-8"} alt="instagram" />
              <img src="./facebook-icon.svg" className={!isDesktop ? "w-[19px] h-[19px]" : "h-8"} alt="facebook" />
              <img src="./X.svg" className={!isDesktop ? "w-[19px]" : "h-8"} alt="X" />
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-mobSectionPad md:mx-sectionPad mt-10 border-t-darkGray" />
      <div className="flex justify-between px-mobSectionPad md:px-sectionPad py-[1.5rem] font-normal text-lightGray/60 text-[1.3rem]">
        <div className="flex gap-4 md:gap-[3rem]">
          <div>Privacy Policy</div>
          <div>Terms & Conditions</div>
        </div>
        {isDesktop && <div>© 2023 All Rights Reserved</div>}
      </div>
    </footer>
  );
}

export default Footer;
