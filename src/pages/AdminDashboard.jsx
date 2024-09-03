import React, { useState, useEffect } from "react";
import { Plus, ArrowRight } from "react-feather";
import { TbCurrencyNaira } from "react-icons/tb";
import AddModal from "../components/admin/AddModal";
import { useSelector, useDispatch } from "react-redux";
import { setAddModalOpen, setRides } from "../GlobalRedux/slices/AppSlice";
import axios from "axios";
import Ride from "../components/Ride";

function AdminDashboard() {
  const { rides } = useSelector((st) => st.app);
  const dispatch = useDispatch();
  function openAddModal() {
    dispatch(setAddModalOpen(true));
  }
  const getRides = async () => {
    try {
      const response = await axios.get("https://letsgo-i9ei.onrender.com/admin/ride");
      // console.log(response);
      dispatch(setRides(response.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRides();
  }, []);
  useEffect(() => {
    console.log(rides);
  }, [rides]);
  return (
    <>
      <AddModal getRides={getRides} />
      <div className="bg-gainsboro w-screen h-screen text-black">
        <div className="adminNav px-sectionPad py-6 border-b-steelBlue border-b-[2px]">
          <div className="font-poppins font-semibold text-[1.5rem]">
            Admin Dashboard
          </div>
        </div>
        <div className="px-sectionPad py-4">
          <div className="py-2 flex justify-end">
            <button
              className="flex gap-4 bg-sandyBrown px-4 py-2 rounded-md"
              onClick={openAddModal}
            >
              Add a Ride <Plus />
            </button>
          </div>
          <div className=""></div>
        </div>
        <div className="rides px-mobSectionPad md:px-sectionPad max-h-[70vh] overflow-y-auto flex flex-col gap-4">
          {rides?.map((ride, i) => (
            <Ride ride={ride} TbCurrencyNaira={TbCurrencyNaira} ArrowRight={ArrowRight} key={i} getRides={getRides}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
