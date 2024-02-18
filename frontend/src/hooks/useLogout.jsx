import React, { useState } from "react";
import { useAuthContext } from "../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../utils/api";

const useLogout = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    try {
      setLoading(true);
      const response = await axios.post(api + "/auth/logout");

      // console.log(response);
      setUser(null);

      localStorage.removeItem("user");

      // navigate("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have successfully logged out",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Handle errors
      setLoading(false);
      console.error("Error sending data to backend", error);
    }
  };
  return { logout, loading };
};

export default useLogout;
