import React from "react";
import { motion } from "framer-motion";
import ActionButton from "./ActionButton";


const JobDetailheader = ({job , formatDate , formatSalary , hasApplied , applyMessage , shareJob , applyLoading , applyJob , getDaysUntilDeadline }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
    >
      <div className="border-b border-gray-100 pb-6 flex items-start sm:items-center relative">
        {job.companyId && job.companyId.logo && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center rounded-full mr-4 border-2 border-blue-200 shadow-md"
          >
            <img
              src={job.companyId.logo}
              alt={job.companyId.name}
              className="w-12 h-12 object-cover rounded-full"
            />
          </motion.div>
        )}
        <div className="ml-0 sm:ml-20 mt-4 sm:mt-0">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold text-gray-800"
          >
            {job.title}
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-gray-600 flex flex-wrap items-center gap-1 mt-1"
          >
            {job.companyId && job.companyId.name && (
              <span className="font-medium text-indigo-700">
                {job.companyId.name}
              </span>
            )}
            <span className="text-gray-400">•</span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-indigo-500"
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
              {job.location.city}, {job.location.state}, {job.location.country}
            </span>
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-4 flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-1 text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
              <svg
                className="w-4 h-4 text-indigo-500"
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
              <span>Posted: {formatDate(job.postedDate)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm bg-blue-50 px-3 py-1 rounded-full">
              <svg
                className="w-4 h-4 text-blue-500"
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
              <span>{job.applicants} applicants</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium bg-green-50 px-3 py-1 rounded-full text-green-700">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Status: {job.status}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-4 flex flex-wrap gap-3"
          >
            <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              <svg
                className="w-4 h-4 mr-2 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {formatSalary(job.min_salary, job.max_salary)}
            </div>

            <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              <svg
                className="w-4 h-4 mr-2 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                {getDaysUntilDeadline(job.applicationDeadline)} days left
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      
     <ActionButton applyJob={applyJob} applyLoading={applyLoading} shareJob={shareJob} hasApplied={hasApplied}/>

      {applyMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0, y: -10 }}
          className={`mt-4 p-3 rounded-lg text-center ${
            hasApplied || applyMessage.includes("Success") || saved
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {applyMessage}
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobDetailheader;
