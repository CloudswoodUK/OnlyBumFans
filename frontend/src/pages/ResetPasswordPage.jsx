import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "/obf-logo.svg";
import dmca from "/DMCA.svg";
import rta from "/restricted.svg";
import ResetPasswordImage from "/84694.svg";
import InputLogin from "../components/InputLogin";
import { Lock, Loader } from "lucide-react";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const { isLoading, error, resetPassword, message } = userAuthStore();
  const { token } = useParams();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setValidationError(
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character."
      );
    } else {
      setValidationError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setValidationError("Passwords do not match.");
    } else {
      setValidationError("");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success(
        "Password reset successfully, redirecting to the login page...."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password.");
    }
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/3 w-full flex p-4 m-0">
          <div className="flex flex-col items-center w-full max-w-full">
            <div className="flex items-center justify-between mt-4 w-full">
              <img src={logo} alt="Logo" className="w-auto h-16" />
              <div className="flex space-x-4">
                <img src={dmca} alt="DMCA" className="w-auto h-8" />
                <img src={rta} alt="RTA" className="w-auto h-8" />
              </div>
            </div>

            <div className="bg-blue-800 bg-opacity-100 rounded backdrop-blur-md p-4 w-full max-w-full mx-5 my-4 block md:hidden">
              <marquee className="text-center text-white text-lg font-light italic">
                By entering and using this website, you confirm you’re over 18
                years old and agree to be bound by the Terms of Use and Privacy
                Policy 18 U.S.C. 2257 Record-Keeping Requirements Compliance
                Statement. If you provide sensitive personal data, by entering
                the website, you give your explicit consent to process this data
                to tailor the website to your preferences. If you’re looking for
                a way to restrict access for a minor, see our Parental Control
                Guide.
              </marquee>
            </div>

            <div className="flex flex-col items-start justify-center flex-grow p-3 text-left">
              <p className="text-3xl mb-2 font-normal font-sans text-red-700">
                Reset Password
              </p>

              <hr className="w-full border-t-1 border-black my-4" />

              <form onSubmit={handleResetPassword} className="w-full">
                <p className="text-lg font-light mb-3">
                  Please enter your new password. Please remember that the
                  password must be a minimum of eight characters, and must be
                  alphanumeric.
                </p>
                {(error || validationError || message) && (
                  <p className={`text-lg my-2 text-center px-10 py-3 rounded-lg border-2 ${error || validationError ? 'bg-red-200 text-red-700 border-red-700' : 'bg-green-200 text-green-700 border-green-700'}`}>
                    {error || validationError || message}
                  </p>
                )}
                <InputLogin
                  icon={Lock}
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  required
                  onChange={handlePasswordChange}
                />
                <InputLogin
                  icon={Lock}
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  required
                  onChange={handleConfirmPasswordChange}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 bg-black text-white rounded-lg px-10 py-3 font-normal text-lg hover:bg-red-700 hover:border-2"
                >
                  {isLoading ? (
                    <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
                  ) : (
                    "Set New Password"
                  )}
                </button>
                <div className="py-3 font-normal text-lg">
                  <p>
                    Want to login?{" "}
                    <Link
                      to="/login"
                      className="text-red-700 font-normal italic"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:w-2/3 w-full h-full p-3 m-0 items-center justify-center relative">
          <img
            src={ResetPasswordImage}
            alt="Forgot Password illustration"
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg w-[calc(100%-60px)] max-w-[calc(100%-60px)] hover:border hover:border-white">
            <marquee className="text-center text-white text-lg font-light italic">
              By entering and using this website, you confirm you’re over 18
              years old and agree to be bound by the Terms of Use and Privacy
              Policy 18 U.S.C. 2257 Record-Keeping Requirements Compliance
              Statement. If you provide sensitive personal data, by entering the
              website, you give your explicit consent to process this data to
              tailor the website to your preferences. If you’re looking for a
              way to restrict access for a minor, see our Parental Control Guide.
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
