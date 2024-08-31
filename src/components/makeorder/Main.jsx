import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import useResponsiveContent from "../../hooks/useResponsiveContent";
import CTABtn from "../CTABtn";
import DropdownInput from "./DropdownInput";
import cities from "../../cities.json";
import { PaystackButton } from "react-paystack";

function Main() {
  const { isMobile, isDesktop } = useResponsiveContent();

  const fromCities = cities.cities.map((city) => city.city);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [toCities, setToCities] = useState([]);
  const timeOptions = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"];
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    fromCity: selectedFrom,
    toCity: selectedTo,
    time: selectedTime,
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);

  useEffect(() => {
    if (selectedFrom) {
      setToCities(
        cities.cities.find((city) => {
          if (city.city == selectedFrom) {
            return city;
          } else return;
        }).nearbyCities
      );
    }
  }, [selectedFrom]);
  useEffect(() => {
    setFormData({
      ...formData,
      fromCity: selectedFrom,
      toCity: selectedTo,
      time: selectedTime,
    });
  }, [selectedFrom, selectedTo, selectedTime]);

  useEffect(() => {
    if (orderSuccess) {
      setOpenResponse(true);
    }
  }, [orderSuccess]);

  const submitForm = async (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !regex.test(formData.email))
      return setFormError("Please enter a valid email address");
    if (!formData.fromCity)
      return setFormError("Please tell us where you are coming from");
    if (!formData.toCity)
      return setFormError("Please select where you are headed.");
    if (!formData.time)
      return setFormError("Please tell us when you would like to go.");
    try {
      const response = await axios.post(
        "http://localhost:3000/bookform",
        formData
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
              Your Order has been completed.<br />
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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>Where are you coming from?(City)</div>
            <DropdownInput
              selectedValue={selectedFrom}
              setSelectedValue={setSelectedFrom}
              values={fromCities}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>Where are you headed?(City)</div>
            <DropdownInput
              selectedValue={selectedTo}
              setSelectedValue={setSelectedTo}
              values={toCities}
            />
          </div>
          <div>
            <div>When do you want to go?</div>
            <DropdownInput
              selectedValue={selectedTime}
              setSelectedValue={setSelectedTime}
              values={timeOptions}
              placeholder="Select a time"
            />
          </div>
          <div className="flex justify-center">
            <CTABtn action={submitForm} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Main;
