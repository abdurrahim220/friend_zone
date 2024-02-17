import React, { useState } from "react";
import GenderCheckBox from "../../components/GenderCheckBox/GenderCheckBox";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

import { useAuthContext } from "../../context/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { setUser } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const allGender = ["male", "female"];

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const selectedGender =
      data.gender && data.gender.length > 0 ? data.gender[0] : "";

    const formData = {
      ...data,
      gender: selectedGender,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration successful!",
      });
      // console.log(response.data);
      // localStorage.setItem("chat-user",JSON.stringify(response))
      setUser(response.data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Registration failed. Please try again.",
      });
      // console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          <div className="flex mt-4 p-2 items-center ">
            <label className=" mr-5">
              <span className="text-base label-text">Gender</span>
            </label>

            <div className="flex flex-wrap">
              {allGender.map((g, i) => (
                <label key={i} className="flex items-center mr-2">
                  <input
                    type="checkbox"
                    name="gender"
                    value={g}
                    className="checkbox border-slate-900"
                    {...register("gender", { required: true })}
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>

            {errors.gender && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          <Link
            to="/login"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Already"} have an account?
          </Link>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-block btn-sm mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
