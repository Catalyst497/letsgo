import React, { useState, useEffect } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { X } from "react-feather";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import DropdownInput from "../makeorder/DropdownInput";
import {
  setAddModalOpen,
  setAdminRideData,
} from "../../GlobalRedux/slices/AppSlice";
import SelectionInputs from "../SelectionInputs";

function AddModal({getRides}) {
  const dispatch = useDispatch();
  const { addModalOpen, adminRideData } = useSelector((st) => st.app);
  const [addModalVisible, setAddModalVisible] = useState(false);
  useEffect(() => {
    if (addModalOpen) setAddModalVisible(true);
    else setAddModalVisible(false);
  }, [addModalOpen]);
  useEffect(() => {
    if (!addModalVisible) {
      setTimeout(() => {
        dispatch(setAddModalOpen(false));
      }, 300);
    }
  }, [addModalVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add new ride to the database here
    try {
      const res = await axios.post("https://letsgo-i9ei.onrender.com/admin/ride", adminRideData);
      console.log(res);
      if (res.data === "Ride Added Successfully") {
        setAddModalVisible(false);
        console.log(res.data);
        getRides();
        // alert(res.data);
      }
    } catch (e) {
      console.error("Error adding new ride:", e.message);
    }
  };
  return (
    <>
      {addModalOpen && (
        <div className="overlay fixed inset-0 z-30 bg-black/30 blur-lg"></div>
      )}
      {addModalOpen && (
        <div
          className={`add-modal fixed z-40 left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] bg-white rounded-lg text-black shadow-md transition-[300ms] w-[80%] md:w-auto ${
            addModalVisible ? "opacity-1" : "opacity-0"
          }`}
        >
          <div className="flex justify-between px-4 py-4 border-b-[2px] border-b-steelBlue">
            <div className="text-[1.5rem]">Add a Ride</div>
            <X size={32} onClick={() => setAddModalVisible(false)} />
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-4 px-8 py-4 items-center">
              <div className="w-full">
                <div className=" font-semibold">Price:</div>
                <div className="flex gap-2 px-4 py-2 rounded-md border-[1px] border-gray-300">
                  <TbCurrencyNaira size={32} />
                  <input
                    type="number"
                    className="w-full"
                    onChange={(e) => {
                      dispatch(
                        setAdminRideData({
                          ...adminRideData,
                          price: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
              </div>
              <SelectionInputs
                fromStatement={"From:"}
                toStatement={"To:"}
                timeStatement={"Time:"}
                rideFormData={adminRideData}
                setRideFormData={setAdminRideData}
                handleSubmit={handleSubmit}
              />

              {/* <div className="w-full flex justify-start py-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-sandyBrown rounded-md text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddModal;
