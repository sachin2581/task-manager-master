"use client";
import { FaLock, FaUser } from "react-icons/fa";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useState, useEffect } from "react";
import { MdError } from "react-icons/md";
import Link from "next/link";
import axiosInstance from "@/api/axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [passwordHideShow, setPasswordHideShow] = useState(true);
  const [registerDetails, setRegisterDetails] = useState({
    password: "",
    email: "",
    fullName: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleRegisterDetails = (e) => {
    const { value, name } = e.target;
    setRegisterDetails({
      ...registerDetails,
      [name]: value,
    });
    setErrorMessage({});
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
    return false;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      !registerDetails.email &&
      !registerDetails.password &&
      !registerDetails.fullName
    ) {
      setErrorMessage({ password: "error", email: "error", fullName: "error" });
      return;
    } else if (!registerDetails.fullName) {
      setErrorMessage({
        fullName: "Please fill out full name.",
      });
      return;
    } else if (!registerDetails.email) {
      setErrorMessage({
        email: "Please fill out email.",
      });
      return;
    }
    const body = {
      email: registerDetails.email,
      password: registerDetails.password,
      fullName: registerDetails.fullName,
    };
    setLoading(true);
    axiosInstance
      .post(`register`, body)
      .then(() => {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-600">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleRegister}>
          {errorMessage.password &&
          errorMessage.email &&
          errorMessage.fullName ? (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-100 p-2 rounded-md">
              <MdError /> Please fill out all required fields.
            </div>
          ) : errorMessage.fullName ? (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-100 p-2 rounded-md">
              <MdError /> {errorMessage.fullName}
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

          {/* Full Name */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaUser />
            </span>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              placeholder="Enter full name"
              autoComplete="name"
              name="fullName"
              id="fullName"
              value={registerDetails.fullName}
              onChange={handleRegisterDetails}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaUser />
            </span>
            <input
              type="email"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              placeholder="Enter email"
              autoComplete="email"
              name="email"
              id="email"
              value={registerDetails.email}
              onChange={handleRegisterDetails}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaLock />
            </span>
            <input
              type={passwordHideShow ? "password" : "text"}
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              name="password"
              id="password"
              autoComplete="new-password"
              value={registerDetails.password}
              onChange={handleRegisterDetails}
              onPaste={preventCopyPaste}
              onCopy={preventCopyPaste}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-teal-600"
              onClick={() => setPasswordHideShow(!passwordHideShow)}
            >
              {passwordHideShow ? <BiSolidHide /> : <BiSolidShow />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Register
          </button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/" className="text-teal-600 hover:underline">
              Log in
            </Link>
          </div>
        </form>

        {mounted && loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
