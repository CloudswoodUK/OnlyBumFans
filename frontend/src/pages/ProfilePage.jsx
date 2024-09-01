import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { userAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "<sup>st</sup>";
    case 2:
      return "<sup>nd</sup>";
    case 3:
      return "<sup>rd</sup>";
    default:
      return "<sup>th</sup>";
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${day}${getOrdinalSuffix(
    day
  )} ${month} ${year} at ${formattedHours}:${minutes} ${period}`;
};

const ProfilePage = () => {
  const { user } = userAuthStore();
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <main className="flex-grow p-4 bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center text-center pt-5 text-red-700 text-3xl font-light">
          <img
            src={user.profilePicture}
            alt="User Avatar"
            className="w-36 h-36 rounded-md border-2 p-1 border-red-700"
          />
          <div className="mt-4 text-xl bg-white text-left p-2 border-2 border-red-700 rounded-lg">
            <p className="font-normal m-2">
              Name :
              <span className="font-light m-2 text-black">{user.name}</span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Email :
              <span className="font-light m-2 text-black">{user.email}</span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Gender :
              <span className="font-light m-2 text-black">{user.gender}</span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Date of Birth :
              <span
                className="font-light m-2 text-black"
                dangerouslySetInnerHTML={{
                  __html: formatDate(user.dateOfBirth),
                }}
              ></span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Country :
              <span className="font-light m-2 text-black">{user.country}</span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Marital Status :
              <span className="font-light m-2 text-black">
                {user.maritalStatus}
              </span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Habit of Smoking :
              <span className="font-light m-2 text-black">
                {user.habitOfSmoking}
              </span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Habit of Drinking Alcohol :
              <span className="font-light m-2 text-black">
                {user.habitOfDrinking}
              </span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Like to Travel :
              <span className="font-light m-2 text-black">
                {user.wantsToTravel}
              </span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Member Since :
              <span className="font-light m-2 text-black">
                <span
                  className="font-light m-2 text-black"
                  dangerouslySetInnerHTML={{
                    __html: formatDateTime(user.createdAt),
                  }}
                ></span>
              </span>
            </p>
            <hr className="w-full border-t-1 border-red-700" />
            <p className="font-normal m-2">
              Last Online :
              <span
                className="font-light m-2 text-black"
                dangerouslySetInnerHTML={{
                  __html: formatDateTime(user.updatedAt),
                }}
              ></span>
            </p>
          </div>
          <Link to="/update-profile">
          <button className="w-full bg-red-700 text-white py-3 px-10 rounded-lg mt-3 text-xl mb-5 font-normal hover:bg-black transition-colors duration-300 ease-in-out">Edit Profile Data</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
