import React, { useState, useEffect } from "react";
import CTABtn from "./CTABtn";
import cities from "../cities.json";
import DropdownInput from "./makeorder/DropdownInput";
import { useSelector, useDispatch } from "react-redux";
import { setToCities } from "../GlobalRedux/slices/AppSlice";

function SelectionInputs({
  fromStatement,
  toStatement,
  timeStatement,
  handleSubmit,
  rideFormData,
  setRideFormData,
}) {
  const dispatch = useDispatch();
  const { fromCities, toCities } = useSelector((st) => st.app);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const timeOptions = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"];
  

  useEffect(() => {
    if (selectedFrom) {
      dispatch(
        setToCities(
          cities.cities.find((city) => {
            if (city.city == selectedFrom) {
              return city;
            } else return;
          }).nearbyCities
        )
      );
    }
  }, [selectedFrom]);
  useEffect(() => {
    dispatch(
      setRideFormData({
        ...rideFormData,
        fromCity: selectedFrom,
        toCity: selectedTo,
        time: selectedTime,
      })
    );
  }, [selectedFrom, selectedTo, selectedTime]);
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div>{fromStatement}</div>
        <DropdownInput
          selectedValue={selectedFrom}
          setSelectedValue={setSelectedFrom}
          values={fromCities}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div>{toStatement}</div>
        <DropdownInput
          selectedValue={selectedTo}
          setSelectedValue={setSelectedTo}
          values={toCities}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div>{timeStatement}</div>
        <DropdownInput
          selectedValue={selectedTime}
          setSelectedValue={setSelectedTime}
          values={timeOptions}
          placeholder="Select a time"
        />
      </div>
      <div className="flex justify-center">
        <CTABtn action={handleSubmit} />
      </div>
    </>
  );
}

export default SelectionInputs;
