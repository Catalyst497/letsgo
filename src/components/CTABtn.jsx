import React from "react";

function CTABtn({
  action = null,
}) {
  return (
    <button
      className="bg-btnBg text-white focus:border-none px-[1.25rem] py-[0.68rem] rounded-lg"
      type="button"
      onClick={(e) => action(e)}
    >
      Book Now
    </button>
  );
}

export default CTABtn;
