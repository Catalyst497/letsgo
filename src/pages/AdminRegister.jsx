import axios from "axios";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "react-feather";
import useResponsiveContent from "../hooks/useResponsiveContent";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
    const {isMobile, isDesktop} = useResponsiveContent()
    const navigate = useNavigate()
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post("https://letsgo-i9ei.onrender.com/admin/register", userData);
    console.log(response);
    alert("User registered")
    navigate("/admin/login")
  }

  return (
    <div className="text-black">
      <div className="font-poppins text-[1.5rem]">Admin Register</div>
      <form>
        <div>
          <div>Email Address</div>
          <input
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <div>
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
        </div>
        <div>
            <button type="submit" className="px-4 py-2 bg-sandyBrown rounded-md text-white" onClick={handleSubmit}>
              Register
            </button>
        </div>
      </form>
    </div>
  );
}

export default AdminRegister;
