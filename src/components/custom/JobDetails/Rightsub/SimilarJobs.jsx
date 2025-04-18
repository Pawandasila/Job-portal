import React from 'react'
import { motion } from 'framer-motion'

const SimilarJobs = ({job}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
        Similar Jobs
      </h3>
      <p className="text-gray-500 text-sm mb-4">
        Here are some similar opportunities based on your profile
      </p>
      <div className="space-y-4">
        
        <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 cursor-pointer">
          <h4 className="font-semibold text-indigo-700">
            Senior Frontend Developer
          </h4>
          <p className="text-sm text-gray-600">TechCorp Inc • Remote</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium text-gray-900">
              $95k - $120k
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              New
            </span>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 cursor-pointer">
          <h4 className="font-semibold text-indigo-700">
            Backend Engineer
          </h4>
          <p className="text-sm text-gray-600">
            DataSystems Ltd • Chicago, IL
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium text-gray-900">
              $110k - $135k
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              3 days ago
            </span>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 cursor-pointer">
          <h4 className="font-semibold text-indigo-700">
            Full Stack Developer
          </h4>
          <p className="text-sm text-gray-600">InnovateSoft • Hybrid</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium text-gray-900">
              $85k - $115k
            </span>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
              1 week ago
            </span>
          </div>
        </div>
      </div>

      <a
        href="/jobs/search"
        className="mt-4 text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm font-medium"
      >
        View more similar jobs
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

export default SimilarJobs