import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, Building, Clipboard, Users, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const RecruiterSidebar = ({ user }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      title: "Manage Applications",
      icon: <Clipboard className="w-5 h-5 mr-2" />,
      path: "/recruiter-access",
    },
    {
      title: "Manage Company",
      icon: <Building className="w-5 h-5 mr-2" />,
      path: "/recruiter-access/company",
    },
    {
      title: "Manage Jobs",
      icon: <Briefcase className="w-5 h-5 mr-2" />,
      path: "/recruiter-access/jobs",
    },
    {
      title: "Manage Candidates",
      icon: <Users className="w-5 h-5 mr-2" />,
      path: "/recruiter-access/candidates",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center text-md font-bold text-blue-700">
          <Briefcase className="mr-2" />
          Recruiter Dashboard
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-grow py-4 z-50 relative">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/recruiter-access" &&
                  location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm rounded-md w-full transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 mt-auto">
        <div className="flex items-center">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
              <span className="text-blue-700 font-medium">
                {user?.firstName?.charAt(0) + user?.lastName?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {user?.firstName + " " + user?.lastName || "User"}
            </span>
            <span className="text-xs text-gray-500 truncate max-w-[150px]">
              {user?.email || "email@example.com"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu - Using Sheet */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md bg-white shadow-md">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            {/* Add SheetTitle for accessibility */}
            <SheetTitle className="sr-only">
              Recruiter Dashboard Navigation
            </SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full border-r w-62 bg-white shadow-sm overflow-y-auto">
        <SidebarContent />
      </div>
    </>
  );
};

export default RecruiterSidebar;
