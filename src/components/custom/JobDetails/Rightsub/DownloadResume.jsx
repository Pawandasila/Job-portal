import React from "react";
import { motion } from "framer-motion";

const DownloadResume = ({ job }) => {
  // later on uncomment it if we have all desired resume template
  //   const handleDownload = () => {
  //     const pdfUrl = `/path-to-your-pdfs/${job.title
  //       .toLowerCase()
  //       .replace(/\s+/g, "-")}-resume-template.pdf`;

  //     const link = document.createElement("a");
  //     link.href = pdfUrl;

  //     link.setAttribute("download", `${job.title} Resume Template.pdf`);

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   };

  const handleDownload = () => {
    const pdfUrl = `/path-to-your-pdfs/${job.title
      .toLowerCase()
      .replace(/\s+/g, "-")}-resume-template.pdf`;

    const link = document.createElement("a");
    link.href = pdfUrl;

    link.setAttribute("download", `${job.title} Resume Template.pdf`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 border border-blue-100"
    >
      <h3 className="text-lg font-bold text-indigo-800 mb-3">
        Need help with your resume?
      </h3>
      <p className="text-indigo-600 text-sm mb-4">
        Download our expert resume template designed for {job.title} roles
      </p>
      <button
        onClick={handleDownload}
        className="w-full bg-white text-indigo-700 hover:text-indigo-800 border border-indigo-200 font-medium py-2.5 px-4 rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        Download Resume Template
      </button>
    </motion.div>
  );
};

export default DownloadResume;
