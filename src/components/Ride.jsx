import React from "react";
import useResponsiveContent from "../hooks/useResponsiveContent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setRides } from "../GlobalRedux/slices/AppSlice";

function Ride({ ride, key, TbCurrencyNaira, ArrowRight, getRides }) {
  const { isMobile } = useResponsiveContent();
  const { rides } = useSelector((st) => st.app);
  const deleteRide = async (id) => {
    try {
      console.log(rides);
      const response = await axios.delete(
        `http://localhost:3000/admin/ride/${id}`
      );
      console.log(response);
      // Filter out the deleted ride from the state
      getRides();
      console.log("Ride deleted successfully");
    } catch (error) {
      console.error("Error deleting ride:", error.message);
      alert("Failed to delete ride");
    }
  };
  return (
    <div
      key={key}
      className="px-8 py-4 flex flex-col md:flex-row gap-4 md:gap-0 justify-between border-[2px] border-steelBlue rounded-md "
    >
      <div className="flex flex-col gap-2">
        <div className="time flex gap-4 items-end">
          <span>{ride.time}</span>
          <span className="text-[0.8rem] text-darkGray">
            {new Date(ride.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{ride.fromCity}</span>
          <ArrowRight size={25} /> <span>{ride.toCity}</span>
        </div>
      </div>
      <div className="price flex md:items-center gap-4 md:gap-8 flex-col md:flex-row items-start">
        <div className="flex items-center  gap-2">
          <TbCurrencyNaira size={25} /> <span>{ride.price}</span>
        </div>
        <button
          type="button"
          onClick={() => deleteRide(ride._id)}
          className="text-white bg-red-500 rounded-md px-4 py-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Ride;
