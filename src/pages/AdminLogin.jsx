import React, { useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import useResponsiveContent from "../hooks/useResponsiveContent";

function AdminLogin() {
  const navigate = useNavigate();
  const { isMobile, isDesktop } = useResponsiveContent();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userData.email) return setError("Enter your email address");
      if (!userData.password) return setError("Enter your password");
      setLoading(true);
      const response = await axios.post(
        "https://letsgo-i9ei.onrender.com/admin/login",
        userData
      );
      setLoading(false);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/admin");
      // You can decode the token if you need user info
      // const decoded = jwt_decode(token);
    } catch (err) {
      setLoading(false);
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="bg-gainsboro w-screen min-h-screen text-black flex justify-center items-center">
      <div className="bg-steelBlue p-8">
        <div className="text-[1.5rem] font-semibold font-poppins">
          Admin Login
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div>Email Address</div>
          <input
            type="email"
            className="focus:border-none border-none outline-none px-2 py-2 w-full rounded-md"
            placeholder="Enter your email"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div>Password</div>
          <div className="flex bg-white gap-4 px-2 py-2 rounded-md">
            <input
              type={passwordOpen ? "text" : "password"}
              className="focus:border-none border-none outline-none"
              placeholder="Enter your password"
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
            {passwordOpen ? (
              <EyeOff
                size={isMobile ? 25 : 32}
                onClick={() => setPasswordOpen(false)}
              />
            ) : (
              <Eye
                size={isMobile ? 25 : 32}
                onClick={() => setPasswordOpen(true)}
              />
            )}
          </div>
          {error && <div className="text-center text-red-500">{error}</div>}
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-sandyBrown rounded-md text-white px-4 py-2 mt-2 flex items-center gap-4"
              onClick={handleSubmit}
            >
              <span>Submit</span>
              {loading && (
                <TailSpin
                  color="white"
                  height={isMobile ? "25" : "32"}
                  width={isMobile ? "25" : "32"}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
