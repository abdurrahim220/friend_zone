import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogOutButton = () => {
  const { logout, loading } = useLogout();
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          size={25}
          onClick={logout}
          className="cursor-pointer text-white"
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogOutButton;
