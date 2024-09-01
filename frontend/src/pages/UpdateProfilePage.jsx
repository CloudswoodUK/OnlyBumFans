import React, { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { userAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import InputLogin from "../components/InputLogin";
import toast from "react-hot-toast";

import {
  User,
  Calendar,
  Globe,
  Images,
  Cigarette,
  Loader,
  Milk,
  Plane,
  UsersRound,
} from "lucide-react";
import SelectSignup from "../components/SelectSignup";

const UpdateProfilePage = () => {
  const { user, updateProfileInformation, error, isLoading } = userAuthStore();
  const [name, setName] = useState("");
  const [gender, setSelectedGenderOption] = useState("");
  const [country, setSelectedCountryOption] = useState("");
  const [maritalStatus, setMarried] = useState("");
  const [habitOfSmoking, setSmoke] = useState("");
  const [habitOfDrinking, setDrink] = useState("");
  const [wantsToTravel, setTravel] = useState("");
  const [profilePicture, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  useEffect(() => {
    if (user) {
      setName(user.name);
      setSelectedGenderOption(user.gender);
      setSelectedCountryOption(user.country);
      setMarried(user.maritalStatus);
      setSmoke(user.habitOfSmoking);
      setDrink(user.habitOfDrinking);
      setTravel(user.wantsToTravel);
      setProfilePreview(user.profile);
      const profileImageURL = user.profilePicture;
      if (profileImageURL) {
        setProfilePreview(profileImageURL);
        console.log("Profile preview state after setting:", profileImageURL);
      }
    }
  }, [user]);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
      const newPreviewURL = URL.createObjectURL(file);
      setProfilePreview(newPreviewURL);

      return () => URL.revokeObjectURL(newPreviewURL);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("country", country);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    formData.append("maritalStatus", maritalStatus);
    formData.append("habitOfSmoking", habitOfSmoking);
    formData.append("habitOfDrinking", habitOfDrinking);
    formData.append("wantsToTravel", wantsToTravel);
  
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      await updateProfileInformation(formData);
      toast.success("Profile updated successfully.");
      navigate("/profile");
    } catch (error) {
      toast.error(`Profile update failed: ${error.response?.data?.message || "Unknown error"}`);
      console.log("Profile update error:", error);
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <main className="flex-grow p-4 bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center text-center pt-5 text-red-700 text-3xl font-light">
          <div className="mt-4 text-xl bg-white text-left p-2 border-2 border-red-700 rounded-lg">
            <form onSubmit={updateProfile} className="w-full">
              <div className="flex items-center justify-center my-4">
                {profilePreview && (
                  <img
                    src={profilePreview}
                    alt="Profile Preview"
                    className="w-36 h-36 rounded-md border-2 p-1 border-red-700"
                  />
                )}
              </div>
              {error && (
                  <p className="text-red-700 font-medium text-lg my-2 text-center px-10 py-3 bg-red-200 rounded-lg border-2 border-red-700">
                    {error}
                  </p>
                )}
              <InputLogin
                icon={Images}
                type="file"
                placeholder="Profile Picture"
                onChange={handleImageChange}
                accept=".jpg, .jpeg, .png"
              />

              <p className="pt-1 pb-2 font-normal text-lg text-red-700">
                [We request you to upload the picture of your bum.]
              </p>
              <InputLogin
                icon={User}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <SelectSignup
                icon={UsersRound}
                value={gender}
                onChange={(e) => setSelectedGenderOption(e.target.value)}
                options={[
                  { value: "", label: "Select Your Gender", disabled: true },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Trans", label: "Trans" },
                  { value: "Lesbian", label: "Lesbian" },
                  { value: "Gay", label: "Gay" },
                ]}
              />

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
              <InputLogin
                icon={UsersRound}
                type="text"
                placeholder="Your marital status ?"
                value={maritalStatus}
                onChange={(e) => setMarried(e.target.value)}
              />
              <InputLogin
                icon={Cigarette}
                type="text"
                placeholder="Do you smoke ?"
                value={habitOfSmoking}
                onChange={(e) => setSmoke(e.target.value)}
              />
              <InputLogin
                icon={Milk}
                type="text"
                placeholder="Do you drink alcohol ?"
                value={habitOfDrinking}
                onChange={(e) => setDrink(e.target.value)}
              />
              <InputLogin
                icon={Plane}
                type="text"
                placeholder="Do you like to travel ?"
                value={wantsToTravel}
                onChange={(e) => setTravel(e.target.value)}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 bg-black text-white rounded-lg px-10 py-3 font-normal text-lg hover:bg-red-700 hover:border-2"
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
                ) : (
                  "Proceed To Update Profile"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateProfilePage;
