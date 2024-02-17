import React from "react";

import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div className="p-4 h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
