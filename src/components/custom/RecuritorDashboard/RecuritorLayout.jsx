import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "@/context/authContext";
import RecruiterSidebar from "./RecruiterSidebar";

const RecruiterLayout = () => {
  const { user } = useContext(AuthContext);

  const LocationSearch = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(LocationSearch.search);
  const userStatus = queryParams.get("user");

  useEffect(() => {
    if (userStatus === "not-verified" && user?.role === "recruiter") {
      navigate("/");
    }
  }, [userStatus, navigate]);

  return (
    <div className="h-screen flex w-full">
      <RecruiterSidebar user={user} />
      <main className="flex-grow p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;
