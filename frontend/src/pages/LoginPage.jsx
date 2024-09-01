import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import logo from "/obf-logo.svg";
import dmca from "/DMCA.svg";
import rta from "/restricted.svg";
import LoginImage from "/84694.svg";

import InputLogin from "../components/InputLogin";
import { Mail, Lock, Loader } from "lucide-react";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading, error } = userAuthStore();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Successfully logged in.");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Column */}
        <div className="md:w-1/3 w-full flex p-4 m-0 ">
          <div className="flex flex-col items-center w-full max-w-full">
            {/* Top Column*/}
            <div className="flex items-center justify-between mt-4 w-full">
              {/* Logo Image */}
              <img src={logo} alt="Logo" className="w-auto h-16" />
              {/* Container for Two Images */}
              <div className="flex space-x-4">
                <img src={dmca} alt="Image 1" className="w-auto h-8" />
                <img src={rta} alt="Image 2" className="w-auto h-8" />
              </div>
            </div>

            {/* Blurred Container */}
            <div className="bg-blue-800 bg-opacity-100 rounded backdrop-blur-md p-4 w-full max-w-full mx-5 my-4 block md:hidden">
              {/* Content inside the blurred container */}
              <marquee className="text-center text-white text-lg font-light italic">
                By entering and using this website, you confirm you’re over 18
                years old and agree to be bound by the Terms of Use and Privacy
                Policy 18 U.S.C. 2257 Record-Keeping Requirements Compliance
                Statement. If you provide sensitive personal data, by entering
                the website, you give your explicit consent to process this data
                to tailor the website to your preferences.If you’re looking for
                a way to restrict access for a minor, see our Parental Control
                Guide
              </marquee>
            </div>
            {/* Form */}
            <div className="flex flex-col items-start justify-center flex-grow p-3 text-left">
              <p className="text-3xl mb-2 font-normal font-sans text-red-700">
                Welcome
              </p>
              {/* Form Description */}
              <p className="text-lg font-light">
                We are creating a better experience for 18+ LIVE entertainment.
                Login our open-minded community & start interacting now.
              </p>
              {/* Divider */}
              <hr className="w-full border-t-1 border-black my-4" />

              {/* Form Fields */}
              <form onSubmit={handleLogin} className="w-full">
                {error && (
                  <p className="text-red-700 font-medium text-lg my-2 text-center px-10 py-3 bg-red-200 rounded-lg border-2 border-red-700">
                    {error}
                  </p>
                )}
                <InputLogin
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputLogin
                  icon={Lock}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 bg-black text-white rounded-lg px-10 py-3 font-normal text-lg hover:bg-red-700 hover:border-2"
                >
                  {isLoading ? (
                    <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
                  ) : (
                    "Proceed To Login"
                  )}
                </button>
                <div className="py-3 font-normal text-lg">
                  <p>
                    Forgot Your Password ? {""}
                    <Link
                      to="/forgot-password"
                      className="text-red-700 font-normal italic"
                    >
                      Reset Password
                    </Link>
                  </p>
                  <p>
                    Don't Have An Account yet ? {""}
                    <Link
                      to="/signup"
                      className="text-red-700 font-normal italic"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            {/*We are creating a better experience for 18+ LIVE entertainment. Join our open-minded community & start interacting now*/}
          </div>
        </div>

        {/* Right Column with Image */}
        <div className="hidden md:flex md:w-2/3 w-full h-full p-3 m-0 items-center justify-center relative">
          <img
            src={LoginImage}
            alt="Login illustration"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Blurred Box */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg w-[calc(100%-60px)] max-w-[calc(100%-60px)] hover:border hover:border-white">
            {/* Content inside the blurred box */}
            <marquee className="text-center text-white text-lg font-light italic">
              By entering and using this website, you confirm you’re over 18
              years old and agree to be bound by the Terms of Use and Privacy
              Policy 18 U.S.C. 2257 Record-Keeping Requirements Compliance
              Statement. If you provide sensitive personal data, by entering the
              website, you give your explicit consent to process this data to
              tailor the website to your preferences.If you’re looking for a way
              to restrict access for a minor, see our Parental Control Guide
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
