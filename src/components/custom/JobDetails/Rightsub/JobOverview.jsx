import React from 'react'
import { motion } from 'framer-motion'

const JobOverview = ({job , formatDate , formatSalary , }) => {
  return (
    <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.5 }}
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
      Job Overview
    </h3>
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="bg-gray-100 p-2 rounded-lg">
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
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Salary Range</div>
          <div className="font-medium text-gray-900">
            {formatSalary(job.min_salary, job.max_salary)}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Job Type</div>
          <div className="font-medium text-gray-900">{(job.location.jobType)}</div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="bg-amber-100 p-2 rounded-lg">
          <svg
            className="w-5 h-5 text-amber-600"
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
        </div>
        <div>
          <div className="text-gray-500 text-sm">
            Application Deadline
          </div>
          <div className="font-medium text-gray-900">
            {formatDate(job.applicationDeadline)}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="bg-indigo-100 p-2 rounded-lg">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Location</div>
          <div className="font-medium text-gray-900">
            {job.location.city}, {job.location.state}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="bg-purple-100 p-2 rounded-lg">
          <svg
            className="w-5 h-5 text-purple-600"
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
        </div>
        <div>
          <div className="text-gray-500 text-sm">Experience Level</div>
          <div className="font-medium text-gray-900">
            {job.experienceLevel}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  )
}

export default JobOverview