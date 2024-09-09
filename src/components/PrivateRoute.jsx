import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState("loading");

  const checkAuthenticated = async () => {
    if (!localStorage.getItem("token")) return navigate("/admin/login");
    try {
      const res = await axios.get(
        "http://localhost:3000/admin/protectedroute",
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      if (!res.data.auth) {
        setLoggedIn(false);
        localStorage.removeItem("token");
      } else {
        setLoggedIn(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);

  //   const token = localStorage.getItem("token");
  if (loggedIn === "loading") {
    return <LoadingPage />;
  } else {
    if (!loggedIn) return <Navigate to="/admin/login" />;
    return children;
  }
};

export default PrivateRoute;
