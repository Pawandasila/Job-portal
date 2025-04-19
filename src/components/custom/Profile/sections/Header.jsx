import React from "react";
import { motion  } from "framer-motion";


const Header = ({ currentProgressColors, progressTracker, progressStatus }) => {
  return (
    <div
      className={`bg-gradient-to-r ${currentProgressColors.bg} shadow-lg transition-colors duration-500 rounded-3xl`}
    >
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile completion status */}
          <div className="flex items-center mb-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block">
            <div
              className={`w-2 h-2 rounded-full ${
                progressStatus === "complete" ? "bg-emerald-400" : "bg-white"
              } mr-2`}
            ></div>
            <span
              className={`text-sm font-medium ${currentProgressColors.text}`}
            >
              {progressStatus === "complete"
                ? "Profile Complete"
                : "Profile in Progress"}
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 ${currentProgressColors.text} tracking-tight`}
          >
            {progressStatus === "complete"
              ? "Your Professional Profile"
              : "Build Your Professional Presence"}
          </h1>

          <p
            className={`${currentProgressColors.text} text-sm sm:text-base mb-8 max-w-2xl opacity-90 leading-relaxed`}
          >
            {currentProgressColors.message}
          </p>

          {/* Progress bar with dynamic color */}
          <div className="relative">
            <div
              className={`${currentProgressColors.progressBg} h-3 rounded-full overflow-hidden`}
            >
              <motion.div
                className={`h-full ${currentProgressColors.progressFill} rounded-full shadow-sm`}
                initial={{ width: 0 }}
                animate={{ width: `${progressTracker}%` }}
                transition={{ duration: 0.8, type: "spring", damping: 20 }}
              ></motion.div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <span
                className={`text-sm font-medium ${currentProgressColors.text}`}
              >
                Profile Strength
              </span>
              <motion.span
                className={`text-lg font-bold ${currentProgressColors.text} flex items-center`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {progressTracker}%
                {progressStatus === "complete" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
