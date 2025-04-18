import React from 'react'
import { motion } from 'framer-motion'

const ApplicationTips = ({job}) => {
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
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      Application Tips
    </h3>
    <ul className="space-y-3">
      <li className="flex items-start gap-2">
        <svg
          className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
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
        <span className="text-gray-700">
          Tailor your resume to highlight relevant{" "}
          <span className='font-semibold'>
          {job.skills.join(", ")} experience
          </span>
        </span>
      </li>
      <li className="flex items-start gap-2">
        <svg
          className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
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
        <span className="text-gray-700">
          Research {job.companyId?.name || "the company"} before your
          interview
        </span>
      </li>
      <li className="flex items-start gap-2">
        <svg
          className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
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
        <span className="text-gray-700">
          Prepare examples of your experience with{" "}
          {job.skills.slice(0, 3).join(", ")}
        </span>
      </li>
      <li className="flex items-start gap-2">
        <svg
          className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
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
        <span className="text-gray-700">
          Follow up within 48 hours after your interview
        </span>
      </li>
    </ul>
    <a
      href="/resources/interview-tips"
      className="mt-4 text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm font-medium"
    >
      View more application resources
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
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </a>
  </motion.div>
  )
}

export default ApplicationTips