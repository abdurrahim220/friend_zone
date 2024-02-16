import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* <Login /> */}

      {/* <SignUp/> */}
      <Home />
    </div>
  );
}

export default App;
