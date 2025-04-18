import React from 'react'
import {motion} from 'framer-motion'

const QuickApply = ({job ,  hasApplied , applicationStatus , applyJob , applyLoading , shareJob}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-xl p-6 text-white"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          ></path>
        </svg>
        Quick Apply
      </h3>
      <p className="text-blue-100 mb-4">
        Submit your application quickly for this {job.title} role at{" "}
        {job.companyId?.name}
      </p>

      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-100">Total Applicants</span>
          <span className="font-bold">{job.applicants}</span>
        </div>
        <div className="w-full bg-blue-800 bg-opacity-40 rounded-full h-2">
          <div
            className="bg-blue-300 h-2 rounded-full"
            style={{
              width: `${Math.min(100, (job.applicants / 50) * 100)}%`,
            }}
          ></div>
        </div>
      </div>

      {applicationStatus && (
        <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-100">Application Status</span>
            <span
              className={`font-bold px-3 py-1 rounded-full text-sm ${
                applicationStatus === "submited" ||
                applicationStatus === "submitted"
                  ? "bg-green-500 text-white"
                  : applicationStatus === "reviewing"
                  ? "bg-yellow-500 text-white"
                  : applicationStatus === "rejected"
                  ? "bg-red-500 text-white"
                  : applicationStatus === "shortlisted"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {applicationStatus === "submited"
                ? "Submitted"
                : applicationStatus.charAt(0).toUpperCase() +
                  applicationStatus.slice(1)}
            </span>
          </div>
        </div>
      )}

      {hasApplied ? (
        <div className="bg-green-500 bg-opacity-20 border border-green-300 rounded-lg p-4 flex items-center gap-3">
          <svg
            className="w-6 h-6 text-green-300"
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
          <div>
            <div className="font-semibold">Application Submitted</div>
            <div className="text-sm text-blue-200">
              Keep an eye on your email for updates
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={applyJob}
          className="w-full bg-white text-indigo-700 hover:text-indigo-800 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mb-4"
          disabled={job.status === "closed" || applyLoading}
        >
          {applyLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Applying...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                ></path>
              </svg>
              Apply Now
            </>
          )}
        </button>
      )}

      <div className="mt-4">
        <div className="text-sm text-blue-200 mb-2">Share via:</div>
        <div className="flex gap-2">
          <button className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </button>
          <button className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </button>
          <button className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
          <button
            className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300"
            onClick={shareJob}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default QuickApply