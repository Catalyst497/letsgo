import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import useResponsiveContent from "../../hooks/useResponsiveContent";
import { PaystackButton } from "react-paystack";
import SelectionInputs from "../selectionInputs";
import {useSelector, useDispatch} from "react-redux";
import { setRideFormData } from "../../GlobalRedux/slices/AppSlice";

function Main() {
  const dispatch = useDispatch();
  const { isMobile, isDesktop } = useResponsiveContent();
  const {rideFormData} = useSelector(st => st.app);
  // const fromCities = cities.cities.map((city) => city.city);
 
  const [formError, setFormError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);

 

  useEffect(() => {
    if (orderSuccess) {
      setOpenResponse(true);
    }
  }, [orderSuccess]);

  const submitForm = async (e) => {
    e.preventDefault();
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
      const response = await axios.post(
        "http://localhost:3000/bookform",
        rideFormData
      );
      if (response.data === "Order Successful") {
        setOrderSuccess(true);
      }
      console.log("Data received by server:", response.data);
    } catch (error) {
      console.error("There was an error sending the data!", error);
    }
  };

  // Paystack integration
  const publicKey = "pk_test_104e305976db2d74a480154fb585ba449e712115"; // Replace with your Paystack public key
  const amount = 5000 * 100; // Amount in kobo
  const email = "customer@email.com";

  const componentProps = {
    email,
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: (response) => {
      alert("Payment successful. Transaction reference: " + response.reference);
      // You can also verify the transaction by sending the reference to your server
    },
    onClose: () => alert("Transaction was not completed, window closed."),
  };

  return (
    <div
      className={`flex items-start ${
        isDesktop ? "justify-between" : "justify-center"
      } w-full px-sectionPad my-[4rem]`}
    >
      {isDesktop && (
        <div className="">
          <img src="./stand.png" alt="stand" />
        </div>
      )}
      <div className="relative">
        {orderSuccess && (
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
        )}
        <div className="font-poppins font-semibold text-black text-center text-[1.5rem] md:text-[1.94rem]">
          Start Your Journey: <br />
          Enter your details to book a ride
        </div>
        <form className="order-form rounded-md flex flex-col bg-[#F3F9F4] py-4 md:py-[3.69rem] px-8 md:px-[5rem] mt-4 md:mt-8 gap-[2.5rem]">
          {formError && <div className="text-red-500">{formError}</div>}
          <div className="flex flex-col gap-4">
            <div>Email Address</div>
            <input
              type="email"
              name="email"
              value={rideFormData.email}
              className="p-2 border-[1px] border-gray-300"
              onChange={(e) =>
                dispatch(setRideFormData({ ...rideFormData, email: e.target.value }))
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
    </div>
  );
}

export default Main;
