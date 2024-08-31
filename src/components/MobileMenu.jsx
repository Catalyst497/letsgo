import React, { useEffect, useRef } from "react";
import { X } from "react-feather";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setSideBarOpen } from "../GlobalRedux/slices/AppSlice";

function MobileMenu() {
    const dispatch = useDispatch();
  const { sideBarOpen } = useSelector((st) => st.app);
  const sidebarRef = useRef(null)
  function close () {
    dispatch(setSideBarOpen(false));
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
        if(sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            close()
        }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    }
  },[close])
  return (
    <>
      {sideBarOpen && (
        <div className="overlay fixed inset-0 bg-black/30 z-40"></div>
      )}
      <div ref={sidebarRef} className={`mobilemenu fixed z-50 inset-y-0 right-0 w-[50%] max-w-[20rem] bg-white transition-[300ms] ${sideBarOpen ? '' : 'translate-x-[100%]'}`}>
        <div className="absolute left-4 top-4" onClick={() => close()}>
          <X size={32} />
        </div>

        <div className="p-4 mt-[4rem]">
          <ul className="flex flex-col gap-6">
            <li>
              <Link to="/makeorder">Book a Ride</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/#footer">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
