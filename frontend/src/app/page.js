"use client";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaLock, FaUser } from "react-icons/fa";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useState } from "react";
import { MdError } from "react-icons/md";
import Link from "next/link";
import axiosInstance from "@/api/axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [passwordHideShow, setPasswordHideShow] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [laoding, setLoading] = useState(false);

  const handleloginDetails = (e) => {
    const { value, name } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
    setErrorMessage({});
  };
  const preventCopyPaste = (e) => {
    e.preventDefault();
    return false;
  };
  const handlelogin = (e) => {
    e.preventDefault();
    if (!loginDetails.email && !loginDetails.password) {
      setErrorMessage({ password: "error", email: "error" });
      return;
    } else if (!loginDetails.email) {
      setErrorMessage({
        email: "Please fill out email or username fields.",
      });
      return;
    }
    const body = {
      email: loginDetails.email,
      password: loginDetails.password,
    };
    setLoading(true);
    axiosInstance
      .post(`login`, body)
      .then((res) => {
        router.push("/dashboard");
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          alert("Access Denied!");
        } else if (err?.response?.status === 404) {
          alert(err.message);
        } else {
          console.log("error", err.message);
        }
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
        <div className="flex justify-center mb-6">
          <HiOutlineUserCircle className="text-6xl text-indigo-600" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handlelogin}>
          {errorMessage.password && errorMessage.email ? (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-100 p-2 rounded-md">
              <MdError /> Please fill out all required fields.
            </div>
          ) : errorMessage.email ? (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-100 p-2 rounded-md">
              <MdError /> {errorMessage.email}
            </div>
          ) : errorMessage.password ? (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-100 p-2 rounded-md">
              <MdError /> {errorMessage.password}
            </div>
          ) : null}

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaUser />
            </span>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter email"
              autoComplete="off"
              name="email"
              id="email"
              value={loginDetails.email}
              onChange={handleloginDetails}
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaLock />
            </span>
            <input
              type={passwordHideShow ? "password" : "text"}
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              name="password"
              id="password"
              autoComplete="off"
              value={loginDetails.password}
              onChange={handleloginDetails}
              onPaste={preventCopyPaste}
              onCopy={preventCopyPaste}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-indigo-600"
              onClick={() => setPasswordHideShow(!passwordHideShow)}
            >
              {passwordHideShow ? <BiSolidHide /> : <BiSolidShow />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
          >
            LOGIN
          </button>

          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Register now.
            </Link>
          </div>
        </form>

        {laoding && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
