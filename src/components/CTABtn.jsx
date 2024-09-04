import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import useResponsiveContent from "../hooks/useResponsiveContent";

function CTABtn({ action = null }) {
  const { loading } = useSelector((st) => st.app);
  const { isMobile } = useResponsiveContent();
  return (
    <button
      className="bg-btnBg text-white focus:border-none px-[1.25rem] py-[0.68rem] rounded-lg flex gap-4"
      type="button"
      onClick={(e) => action(e)}
    >
      <span>Book Now</span>{" "}
      {loading && (
        <TailSpin
          color="white"
          height={isMobile ? "25" : "32"}
          width={isMobile ? "25" : "32"}
        />
      )}
    </button>
  );
}

export default CTABtn;
