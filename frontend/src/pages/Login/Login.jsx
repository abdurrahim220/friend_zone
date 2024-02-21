import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { api } from "../../utils/api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(api + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUser(data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login successful!",
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          <Link
            to="/sign-up"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
