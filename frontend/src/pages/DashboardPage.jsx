import React from "react";
import DashboardHeader from "../components/DashboardHeader";

const DashboardPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <main className="flex-grow p-4 bg-gray-100">
        <div className="flex items-center justify-center h-screen text-center text-red-700 text-3xl font-light">
          Dashboard Page
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
