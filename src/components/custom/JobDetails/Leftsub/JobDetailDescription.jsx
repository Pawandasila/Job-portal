import React from "react";
import { motion } from "framer-motion";

const JobDetailDescription = ({ job, formatDate }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        Job Description
      </h3>
      <p className="text-gray-700 leading-relaxed">{job.description}</p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6"
      >
        <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          Requirements
        </h4>
        <ul className="list-none pl-0 space-y-2 text-gray-700">
          {job.requirement.map((req, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg"
            >
              <svg
                className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
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
              <span>{req}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-6"
      >
        <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          Skills Required
        </h4>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
              className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-indigo-100"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Job Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100"
      >
        <h4 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-600"
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
          Application Timeline
        </h4>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-indigo-200 rounded-full"></div>

          <div className="flex mb-8 relative">
            <div className="h-16 w-16 rounded-full bg-indigo-100 border-4 border-white shadow-md flex items-center justify-center z-10 flex-shrink-0">
              <svg
                className="w-8 h-8 text-indigo-600"
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
            </div>
            <div className="ml-4 pt-3">
              <h5 className="text-lg font-semibold text-indigo-700">
                Application Deadline
              </h5>
              <p className="text-indigo-600">
                {formatDate(job.applicationDeadline)}
              </p>
            </div>
          </div>

          <div className="flex mb-8 relative">
            <div className="h-16 w-16 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center z-10 flex-shrink-0">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
            </div>
            <div className="ml-4 pt-3">
              <h5 className="text-lg font-semibold text-blue-700">
                Screening Process
              </h5>
              <p className="text-blue-600">
                1-2 weeks after application deadline
              </p>
            </div>
          </div>

          <div className="flex relative">
            <div className="h-16 w-16 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center z-10 flex-shrink-0">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <div className="ml-4 pt-3">
              <h5 className="text-lg font-semibold text-green-700">
                Expected Start Date
              </h5>
              <p className="text-green-600">Within 4 weeks after selection</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JobDetailDescription;
