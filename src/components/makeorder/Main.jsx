import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import useResponsiveContent from "../../hooks/useResponsiveContent";
import { TailSpin } from "react-loader-spinner";
import { PaystackButton } from "react-paystack";
import SelectionInputs from "../SelectionInputs";
import { useSelector, useDispatch } from "react-redux";
import {
  setRideFormData,
  setLoading,
  setOrderedRide,
} from "../../GlobalRedux/slices/AppSlice";

function Main() {
  const dispatch = useDispatch();
  const { isMobile, isDesktop } = useResponsiveContent();
  const { rideFormData, loading, orderedRide } = useSelector((st) => st.app);
  // const fromCities = cities.cities.map((city) => city.city);

  const [formError, setFormError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const initializeTransaction = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "https://letsgo-i9ei.onrender.com/initTransaction",
        { email: rideFormData.email, amount: orderedRide.price }
      );
      if (response.data.status === "success") {
        dispatch(setLoading(false))
        window.location.href = response.data.authorization_url; // Redirect user to Paystack's payment page
      } else {
        dispatch(setLoading(false))
        console.error("Failed to initialize payment");
      }
    } catch (err) {
      dispatch(setLoading(false))
      alert("Error", err);
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rideFormData.email || !regex.test(rideFormData.email))
      return setFormError("Please enter a valid email address");
    if (!rideFormData.fromCity)
      return setFormError("Please tell us where you are coming from");
    if (!rideFormData.toCity)
      return setFormError("Please select where you are headed.");
    if (!rideFormData.time)
      return setFormError("Please tell us when you would like to go.");
    try {
      const res = await axios.get("https://letsgo-i9ei.onrender.com/checkforride", {
        params: rideFormData,
      });
      if (!res?.data.length) {
        dispatch(setLoading(false));
        setFormError(
          "Sorry, there are no available rides for \nthat time, location, and destination. \nPlease try again later."
        );
        return;
      }
      dispatch(setOrderedRide(res.data.rides[0]));
    } catch (err) {
      dispatch(setLoading(false));
      console.error("There was an error sending the data!", err);
    }
    try {
      const response = await axios.post(
        "https://letsgo-i9ei.onrender.com/bookform",
        rideFormData
      );
      if (response.data === "Order Successful") {
        dispatch(setLoading(false));
        setOrderSuccess(true);
        setFormError("");
      }
      console.log("Data received by server:", response.data);
    } catch (error) {
      dispatch(setLoading(false));
      console.error("There was an error sending the data!", error);
    }
    [];
  };


  return (
    <div
      className={`flex items-start ${
        isDesktop
          ? "justify-between px-sectionPad my-[4rem]"
          : "justify-center px-mobSectionPad my-[2rem]"
      } w-full`}
    >
      {isDesktop && (
        <div className="">
          <img src="./stand.png" alt="stand" />
        </div>
      )}
      {!orderSuccess ? (
        <div className="relative">
          {/* {orderSuccess && (
          <div
            className={`absolute flex flex-col gap-6 left-[50%] transition-[300ms] ${
              openResponse ? "-translate-x-[50%]" : "translate-x-[100%]"
            } items-center p-6 rounded-lg bg-white top-0 shadow-lg`}
          >
            <div className="bg-forestGreen w-[6rem] h-[6rem] rounded-full flex items-center justify-center">
              <FaCheck className="text-white" size={50} />
            </div>
            <div className="text-center w-max">
              Your Order has been completed.
              <br />
              <PaystackButton {...componentProps} className="underline" />{" "}
            </div>
          </div>
        )} */}
          <div className="flex-1 font-poppins font-semibold text-black text-center text-[1.5rem] md:text-[1.94rem]">
            Start Your Journey: <br />
            Enter your details to book a ride
          </div>
          <form className="order-form rounded-md flex flex-col bg-[#F3F9F4] py-4 md:py-[3.69rem] px-8 md:px-[5rem] mt-4 md:mt-8 gap-[2.5rem] w-full">
            {formError && (
              <div className="text-red-500 max-w-[25rem]">{formError}</div>
            )}
            <div className="flex flex-col gap-4">
              <div>Email Address</div>
              <input
                type="email"
                name="email"
                value={rideFormData.email}
                className="p-2 border-[1px] border-gray-300"
                onChange={(e) =>
                  dispatch(
                    setRideFormData({ ...rideFormData, email: e.target.value })
                  )
                }
              />
            </div>
            <SelectionInputs
              fromStatement={"Where are you coming from?(City)"}
              toStatement={"Where are you headed?(City)"}
              timeStatement={"When do you want to go?"}
              handleSubmit={submitForm}
              rideFormData={rideFormData}
              setRideFormData={setRideFormData}
            />
          </form>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex justify-center md:py-8 md-4 ">
            <div className="bg-forestGreen w-[6rem] h-[6rem] rounded-full flex items-center justify-center">
              <FaCheck className="text-white" size={50} />
            </div>
          </div>
          <div className="font-poppins font-semibold text-[1.2rem] md:text-[1.4rem]">
            Congratulations! Your Order is registered.
          </div>
          <div className="md:py-4 py-2 flex flex-col items-center">
            <div>Please make your payment here:</div>
            <button
              onClick={initializeTransaction}
              className="flex items-center gap-4 px-4 py-2 rounded-lg bg-warmOrange text-white mt-4"
            >
              <span>Paystack</span>
              {loading && <TailSpin
                color="white"
                height={isMobile ? "25" : "32"}
                width={isMobile ? "25" : "32"}
              />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
