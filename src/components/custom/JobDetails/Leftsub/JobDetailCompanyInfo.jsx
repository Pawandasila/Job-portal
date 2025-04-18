import React from "react";
import { motion } from "framer-motion";

const JobDetailCompanyInfo = ({ job, company }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
        About the Company
      </h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="text-center md:text-left">
          {job.companyId.logo && (
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 mx-auto md:mx-0 flex items-center justify-center rounded-full border-2 border-blue-200 shadow-md mb-4">
              <img
                src={job.companyId.logo}
                alt={job.companyId.name}
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
          )}
          <h4 className="text-lg font-semibold text-indigo-700">
            {job.companyId.name}
          </h4>
          <p className="text-gray-600 mt-1 text-sm">{job.companyId.industry}</p>
          <div className="mt-2 flex justify-center md:justify-start">
            <a
              href={job.companyId.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
              Visit Website
            </a>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed">
            {job.companyId.description}
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>
                {job.companyId.location?.city}, {job.companyId.location?.state},{" "}
                {job.companyId.location?.country}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              <span>{job.companyId.employeeCount}+ employees</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>Founded in {job.companyId.foundedYear}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetailCompanyInfo;
