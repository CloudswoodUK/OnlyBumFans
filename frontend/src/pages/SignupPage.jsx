import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import signupImage from "/589999.svg";
import logo from "/obf-logo.svg";
import dmca from "/DMCA.svg";
import rta from "/restricted.svg";

import InputSignup from "../components/InputSignup";
import SelectSignup from "../components/SelectSignup";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Globe,
  UsersRound,
  Loader,
} from "lucide-react";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import InputDateSignup from "../components/InputDateSignup";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [gender, setSelectedGenderOption] = useState("");
  const [country, setSelectedCountryOption] = useState("");

  const navigate = useNavigate();
  const { signup, error, isLoading } = userAuthStore();
  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const monthName = months[monthIndex];
    return `${day} ${monthName} ${year}`;
  };
  
  const handleDateChange = (date) => {
    setDob(formatDate(date));
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name, gender, dateOfBirth, country);
      toast.success("Successfully signed up.");
      navigate("/verify-email");
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
                Hi there!
              </p>
              {/* Form Description */}
              <p className="text-lg font-light">
                We are creating a better experience for 18+ LIVE entertainment.
                Join our open-minded community & start interacting now.
              </p>
              {/* Divider */}
              <hr className="w-full border-t-1 border-black my-4" />

              <form onSubmit={handleSignup} className="w-full">
                {error && (
                  <p className="text-red-700 font-medium text-lg my-2 text-center px-10 py-3 bg-red-200 rounded-lg border-2 border-red-700">
                    {error}
                  </p>
                )}
                <InputSignup
                  icon={User}
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputSignup
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputSignup
                  icon={Lock}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <SelectSignup
                  icon={UsersRound}
                  value={gender} // Bind the selected value to state
                  onChange={(e) => setSelectedGenderOption(e.target.value)} // Update state on change
                  options={[
                    { value: "", label: "Select Your Gender", disabled: true }, // Disable the placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Ladyboy", label: "Ladyboy" },
                  ]}
                />
                <InputDateSignup icon={Calendar}>
                  <DatePicker
                    selected={dateOfBirth ? new Date(dateOfBirth) : null}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    className="bg-transparent placeholder-black focus:border-0 focus:ring-0 w-full"
                    
                  />
                </InputDateSignup>

                <SelectSignup
                  icon={Globe}
                  value={country}
                  onChange={(e) => setSelectedCountryOption(e.target.value)}
                  options={[
                    {
                      value: "",
                      label: "Select Your Country",
                      disabled: true,
                    },
                    { value: "Afghanistan", label: "Afghanistan" },
                    { value: "Albania", label: "Albania" },
                    { value: "Algeria", label: "Algeria" },
                    { value: "American Samoa", label: "American Samoa" },
                    { value: "Andorra", label: "Andorra" },
                    { value: "Angola", label: "Angola" },
                    { value: "Anguilla", label: "Anguilla" },
                    {
                      value: "Antigua and Barbuda",
                      label: "Antigua and Barbuda",
                    },
                    { value: "Argentina", label: "Argentina" },
                    { value: "Armenia", label: "Armenia" },
                    { value: "Australia", label: "Australia" },
                    { value: "Austria", label: "Austria" },
                    { value: "Azerbaijan", label: "Azerbaijan" },
                    { value: "Bahamas", label: "Bahamas" },
                    { value: "Bahrain", label: "Bahrain" },
                    { value: "Bangladesh", label: "Bangladesh" },
                    { value: "Barbados", label: "Barbados" },
                    { value: "Belarus", label: "Belarus" },
                    { value: "Belgium", label: "Belgium" },
                    { value: "Belize", label: "Belize" },
                    { value: "Benin", label: "Benin" },
                    { value: "Bermuda", label: "Bermuda" },
                    { value: "Bhutan", label: "Bhutan" },
                    { value: "Bolivia", label: "Bolivia" },
                    {
                      value: "Bosnia and Herzegovina",
                      label: "Bosnia and Herzegovina",
                    },
                    { value: "Botswana", label: "Botswana" },
                    { value: "Brazil", label: "Brazil" },
                    {
                      value: "British Indian Ocean Territory",
                      label: "British Indian Ocean Territory",
                    },
                    {
                      value: "British Virgin Islands",
                      label: "British Virgin Islands",
                    },
                    { value: "Brunei", label: "Brunei" },
                    { value: "Bulgaria", label: "Bulgaria" },
                    { value: "Burkina Faso", label: "Burkina Faso" },
                    { value: "Burundi", label: "Burundi" },
                    { value: "Cambodia", label: "Cambodia" },
                    { value: "Cameroon", label: "Cameroon" },
                    { value: "Canada", label: "Canada" },
                    { value: "Cape Verde", label: "Cape Verde" },
                    {
                      value: "Caribbean Netherlands",
                      label: "Caribbean Netherlands",
                    },
                    { value: "Cayman Islands", label: "Cayman Islands" },
                    {
                      value: "Central African Republic",
                      label: "Central African Republic",
                    },
                    { value: "Chad", label: "Chad" },
                    { value: "Chile", label: "Chile" },
                    { value: "China", label: "China" },
                    { value: "Christmas Island", label: "Christmas Island" },
                    {
                      value: "Cocos (Keeling) Islands",
                      label: "Cocos (Keeling) Islands",
                    },
                    { value: "Colombia", label: "Colombia" },
                    { value: "Comoros", label: "Comoros" },
                    {
                      value: "Congo - Brazzaville",
                      label: "Congo - Brazzaville",
                    },
                    { value: "Congo - Kinshasa", label: "Congo - Kinshasa" },
                    { value: "Cook Islands", label: "Cook Islands" },
                    { value: "Costa Rica", label: "Costa Rica" },
                    { value: "Croatia", label: "Croatia" },
                    { value: "Cuba", label: "Cuba" },
                    { value: "Curaçao", label: "Curaçao" },
                    { value: "Cyprus", label: "Cyprus" },
                    { value: "Czechia", label: "Czechia" },
                    { value: "Denmark", label: "Denmark" },
                    { value: "Djibouti", label: "Djibouti" },
                    { value: "Dominica", label: "Dominica" },
                    {
                      value: "Dominican Republic",
                      label: "Dominican Republic",
                    },
                    { value: "Ecuador", label: "Ecuador" },
                    { value: "Egypt", label: "Egypt" },
                    { value: "El Salvador", label: "El Salvador" },
                    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
                    { value: "Eritrea", label: "Eritrea" },
                    { value: "Estonia", label: "Estonia" },
                    { value: "Eswatini", label: "Eswatini" },
                    { value: "Ethiopia", label: "Ethiopia" },
                    { value: "Falkland Islands", label: "Falkland Islands" },
                    { value: "Faroe Islands", label: "Faroe Islands" },
                    { value: "Fiji", label: "Fiji" },
                    { value: "Finland", label: "Finland" },
                    { value: "France", label: "France" },
                    { value: "French Guiana", label: "French Guiana" },
                    { value: "French Polynesia", label: "French Polynesia" },
                    {
                      value: "French Southern Territories",
                      label: "French Southern Territories",
                    },
                    { value: "Gabon", label: "Gabon" },
                    { value: "Gambia", label: "Gambia" },
                    { value: "Georgia", label: "Georgia" },
                    { value: "Germany", label: "Germany" },
                    { value: "Ghana", label: "Ghana" },
                    { value: "Gibraltar", label: "Gibraltar" },
                    { value: "Greece", label: "Greece" },
                    { value: "Greenland", label: "Greenland" },
                    { value: "Grenada", label: "Grenada" },
                    { value: "Guadeloupe", label: "Guadeloupe" },
                    { value: "Guam", label: "Guam" },
                    { value: "Guatemala", label: "Guatemala" },
                    { value: "Guernsey", label: "Guernsey" },
                    { value: "Guinea", label: "Guinea" },
                    { value: "Guinea-Bissau", label: "Guinea-Bissau" },
                    { value: "Guyana", label: "Guyana" },
                    { value: "Haiti", label: "Haiti" },
                    { value: "Honduras", label: "Honduras" },
                    { value: "Hong Kong", label: "Hong Kong" },
                    { value: "Hungary", label: "Hungary" },
                    { value: "Iceland", label: "Iceland" },
                    { value: "India", label: "India" },
                    { value: "Indonesia", label: "Indonesia" },
                    { value: "Iran", label: "Iran" },
                    { value: "Iraq", label: "Iraq" },
                    { value: "Ireland", label: "Ireland" },
                    { value: "Isle of Man", label: "Isle of Man" },
                    { value: "Israel", label: "Israel" },
                    { value: "Italy", label: "Italy" },
                    { value: "Jamaica", label: "Jamaica" },
                    { value: "Japan", label: "Japan" },
                    { value: "Jersey", label: "Jersey" },
                    { value: "Jordan", label: "Jordan" },
                    { value: "Kazakhstan", label: "Kazakhstan" },
                    { value: "Kenya", label: "Kenya" },
                    { value: "Kiribati", label: "Kiribati" },
                    { value: "Kosovo", label: "Kosovo" },
                    { value: "Kuwait", label: "Kuwait" },
                    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
                    { value: "Laos", label: "Laos" },
                    { value: "Latvia", label: "Latvia" },
                    { value: "Lebanon", label: "Lebanon" },
                    { value: "Lesotho", label: "Lesotho" },
                    { value: "Liberia", label: "Liberia" },
                    { value: "Libya", label: "Libya" },
                    { value: "Liechtenstein", label: "Liechtenstein" },
                    { value: "Lithuania", label: "Lithuania" },
                    { value: "Luxembourg", label: "Luxembourg" },
                    { value: "Macao", label: "Macao" },
                    { value: "Madagascar", label: "Madagascar" },
                    { value: "Malawi", label: "Malawi" },
                    { value: "Malaysia", label: "Malaysia" },
                    { value: "Maldives", label: "Maldives" },
                    { value: "Mali", label: "Mali" },
                    { value: "Malta", label: "Malta" },
                    { value: "Marshall Islands", label: "Marshall Islands" },
                    { value: "Martinique", label: "Martinique" },
                    { value: "Mauritania", label: "Mauritania" },
                    { value: "Mauritius", label: "Mauritius" },
                    { value: "Mayotte", label: "Mayotte" },
                    { value: "Mexico", label: "Mexico" },
                    { value: "Micronesia", label: "Micronesia" },
                    { value: "Moldova", label: "Moldova" },
                    { value: "Monaco", label: "Monaco" },
                    { value: "Mongolia", label: "Mongolia" },
                    { value: "Montenegro", label: "Montenegro" },
                    { value: "Montserrat", label: "Montserrat" },
                    { value: "Morocco", label: "Morocco" },
                    { value: "Mozambique", label: "Mozambique" },
                    { value: "Myanmar (Burma)", label: "Myanmar (Burma)" },
                    { value: "Namibia", label: "Namibia" },
                    { value: "Nauru", label: "Nauru" },
                    { value: "Nepal", label: "Nepal" },
                    { value: "Netherlands", label: "Netherlands" },
                    { value: "New Caledonia", label: "New Caledonia" },
                    { value: "New Zealand", label: "New Zealand" },
                    { value: "Nicaragua", label: "Nicaragua" },
                    { value: "Niger", label: "Niger" },
                    { value: "Nigeria", label: "Nigeria" },
                    { value: "Niue", label: "Niue" },
                    { value: "Norfolk Island", label: "Norfolk Island" },
                    { value: "North Korea", label: "North Korea" },
                    { value: "North Macedonia", label: "North Macedonia" },
                    {
                      value: "Northern Mariana Islands",
                      label: "Northern Mariana Islands",
                    },
                    { value: "Norway", label: "Norway" },
                    { value: "Oman", label: "Oman" },
                    { value: "Pakistan", label: "Pakistan" },
                    { value: "Palau", label: "Palau" },
                    { value: "Palestine", label: "Palestine" },
                    { value: "Panama", label: "Panama" },
                    { value: "Papua New Guinea", label: "Papua New Guinea" },
                    { value: "Paraguay", label: "Paraguay" },
                    { value: "Peru", label: "Peru" },
                    { value: "Philippines", label: "Philippines" },
                    { value: "Pitcairn Islands", label: "Pitcairn Islands" },
                    { value: "Poland", label: "Poland" },
                    { value: "Portugal", label: "Portugal" },
                    { value: "Puerto Rico", label: "Puerto Rico" },
                    { value: "Qatar", label: "Qatar" },
                    { value: "Réunion", label: "Réunion" },
                    { value: "Romania", label: "Romania" },
                    { value: "Russia", label: "Russia" },
                    { value: "Rwanda", label: "Rwanda" },
                    { value: "Saint Barthélemy", label: "Saint Barthélemy" },
                    { value: "Saint Helena", label: "Saint Helena" },
                    {
                      value: "Saint Kitts and Nevis",
                      label: "Saint Kitts and Nevis",
                    },
                    { value: "Saint Lucia", label: "Saint Lucia" },
                    { value: "Saint Martin", label: "Saint Martin" },
                    {
                      value: "Saint Pierre and Miquelon",
                      label: "Saint Pierre and Miquelon",
                    },
                    {
                      value: "Saint Vincent and the Grenadines",
                      label: "Saint Vincent and the Grenadines",
                    },
                    { value: "Samoa", label: "Samoa" },
                    { value: "San Marino", label: "San Marino" },
                    {
                      value: "Sao Tome and Principe",
                      label: "Sao Tome and Principe",
                    },
                    { value: "Saudi Arabia", label: "Saudi Arabia" },
                    { value: "Senegal", label: "Senegal" },
                    { value: "Serbia", label: "Serbia" },
                    { value: "Seychelles", label: "Seychelles" },
                    { value: "Sierra Leone", label: "Sierra Leone" },
                    { value: "Singapore", label: "Singapore" },
                    { value: "Sint Maarten", label: "Sint Maarten" },
                    { value: "Slovakia", label: "Slovakia" },
                    { value: "Slovenia", label: "Slovenia" },
                    { value: "Solomon Islands", label: "Solomon Islands" },
                    { value: "Somalia", label: "Somalia" },
                    { value: "South Africa", label: "South Africa" },
                    {
                      value: "South Georgia and the South Sandwich Islands",
                      label: "South Georgia and the South Sandwich Islands",
                    },
                    { value: "South Sudan", label: "South Sudan" },
                    { value: "Spain", label: "Spain" },
                    { value: "Sri Lanka", label: "Sri Lanka" },
                    { value: "Sudan", label: "Sudan" },
                    { value: "Suriname", label: "Suriname" },
                    {
                      value: "Svalbard and Jan Mayen",
                      label: "Svalbard and Jan Mayen",
                    },
                    { value: "Sweden", label: "Sweden" },
                    { value: "Switzerland", label: "Switzerland" },
                    { value: "Syria", label: "Syria" },
                    { value: "Taiwan", label: "Taiwan" },
                    { value: "Tajikistan", label: "Tajikistan" },
                    { value: "Tanzania", label: "Tanzania" },
                    { value: "Thailand", label: "Thailand" },
                    { value: "Timor-Leste", label: "Timor-Leste" },
                    { value: "Togo", label: "Togo" },
                    { value: "Tokelau", label: "Tokelau" },
                    { value: "Tonga", label: "Tonga" },
                    {
                      value: "Trinidad and Tobago",
                      label: "Trinidad and Tobago",
                    },
                    { value: "Tunisia", label: "Tunisia" },
                    { value: "Turkey", label: "Turkey" },
                    { value: "Turkmenistan", label: "Turkmenistan" },
                    { value: "Tuvalu", label: "Tuvalu" },
                    {
                      value: "U.S. Outlying Islands",
                      label: "U.S. Outlying Islands",
                    },
                    { value: "Uganda", label: "Uganda" },
                    { value: "Ukraine", label: "Ukraine" },
                    {
                      value: "United Arab Emirates",
                      label: "United Arab Emirates",
                    },
                    { value: "United Kingdom", label: "United Kingdom" },
                    { value: "United States", label: "United States" },
                    { value: "Uruguay", label: "Uruguay" },
                    { value: "Uzbekistan", label: "Uzbekistan" },
                    { value: "Vanuatu", label: "Vanuatu" },
                    { value: "Vatican City", label: "Vatican City" },
                    { value: "Venezuela", label: "Venezuela" },
                    { value: "Vietnam", label: "Vietnam" },
                    { value: "Western Sahara", label: "Western Sahara" },
                    { value: "Yemen", label: "Yemen" },
                    { value: "Zambia", label: "Zambia" },
                    { value: "Zimbabwe", label: "Zimbabwe" },
                  ]}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 bg-black text-white rounded-lg px-10 py-3 font-normal text-lg hover:bg-red-700 hover:border-2"
                >
                  {isLoading ? (
                    <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
                  ) : (
                    "Proceed To Signup"
                  )}
                </button>
                <div className="py-3 font-normal text-lg">
                  <p>
                    Already Have An Account ? {""}
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
            {/*We are creating a better experience for 18+ LIVE entertainment. Join our open-minded community & start interacting now*/}
          </div>
        </div>

        {/* Right Column with Image */}
        <div className="hidden md:flex md:w-2/3 w-full h-full p-3 m-0 items-center justify-center relative">
          <img
            src={signupImage}
            alt="Sign up illustration"
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

export default SignupPage;
