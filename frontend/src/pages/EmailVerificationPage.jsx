import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/obf-logo.svg";
import dmca from "/DMCA.svg";
import rta from "/restricted.svg";
import LoginImage from "/46464688.svg";
import { Loader } from "lucide-react";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";


const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate([]);
  const { verifyEmail, error, isLoading } = userAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleEmailVerification = async(e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/additional-information");
      toast.success("Email verified successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
        handleEmailVerification(new Event("submit"));
    }
  }, [code]);

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
                Verify Your Email Address
              </p>
              {/* Form Description */}
              <p className="text-lg font-light">
                Please enter the 6 digit OTP sent to your email address. OTP is
                valid for 24 hours. Please Don't share your OTP with anyone.
              </p>
              {/* Divider */}
              <hr className="w-full border-t-1 border-black my-4" />

              {/* Form Fields */}
              <form onSubmit={handleEmailVerification} className="w-full">
              {error && (
                  <p className="text-red-700 font-medium text-lg my-5 text-center px-10 py-3 bg-red-200 rounded-lg border-2 border-red-700">
                    {error}
                  </p>
                )}
                <div className="flex justify-between">
                
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="6"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-2xl text-center bg-gray-400 bg-opacity-50 rounded-lg border-red-700 focus:border-red-700 focus:ring-2
    focus:ring-red-700 text-black placeholder-gray-700 transition duration-200"
                    />
                  ))}
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || code.some((digit) => !digit)}
                  className="w-full mt-5 bg-black text-white rounded-lg px-10 py-3 font-normal text-lg hover:bg-red-700 hover:border-2"
                >
                  {isLoading ? <Loader className="w-6 h-6 animate-spin text-center mx-auto"/> : "Proceed To Verify"}
                </button>
                
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

export default EmailVerificationPage;
