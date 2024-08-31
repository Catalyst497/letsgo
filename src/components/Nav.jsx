import React from "react";
import { Menu } from "react-feather";
import { Link } from "react-router-dom";
import useResponsiveContent from "../hooks/useResponsiveContent";
import MobileMenu from "./MobileMenu";
import { useDispatch } from "react-redux";
import { setSideBarOpen } from "../GlobalRedux/slices/AppSlice";

function Nav({ active }) {
  const dispatch = useDispatch()
  const { isMobile, isTablet, isDesktop } = useResponsiveContent();

  return (
    <>
    {!isDesktop && <MobileMenu />}
    <nav className="flex justify-between md:items-end items-center w-full px-mobSectionPad py-4 md:px-[4.8rem] md:py-[1.9rem]">
      <Link to={'/'} className="flex-1">
        <img src="./Logo.png" alt="logo" />
      </Link>
      {isDesktop ? (
        <div className="flex-1 flex items-center justify-between text-forestGreen font-normal">
          <Link to={'/makeorder'} className={`${active === "Book A Ride" ? "font-bold" : ""}`}>
            Book A Ride
          </Link>
          <Link to={'/aboutus'} className={`${active === "About Us" ? "font-bold" : ""}`}>
            About Us
          </Link>
          <Link to={'/contactus'} className={`${active === "Contact Us" ? "font-bold" : ""}`}>
            Contact US
          </Link>
        </div>
      ) : (
        <div onClick={() => dispatch(setSideBarOpen(true))}>
          <Menu />
        </div>
      )}
    </nav>
    </>
    
  );
}

export default Nav;
