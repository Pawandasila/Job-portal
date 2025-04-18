import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";
import Right from "@/components/custom/JobDetails/Right";
import Left from "@/components/custom/JobDetails/Left";
// import { saveAs } from "file-saver";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const { id } = useParams();
  const axios = useAxios();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/job/${id}`);

        if (response.data.success) {
          setJob(response.data.job);
          await checkIfApplied();
        } else {
          setError("Failed to fetch job details");
        }
      } catch (err) {
        setError("An error occurred while fetching job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, axios]);

  const checkIfApplied = async () => {
    try {
      const response = await axios.get(`/job/applied/user`);
      if (response.data.success) {
        const jobExists = response.data.jobs.some((job) => job._id === id);

        if (jobExists) {
          setHasApplied(true);
        } else {
          setHasApplied(false);
        }
      }
    } catch (err) {
      console.error("Error checking application status:", err);
    }
  };

  const applyJob = async () => {
    if (hasApplied) {
      setApplyMessage("You have already applied for this job");
      return;
    }

    try {
      setApplyLoading(true);
      const response = await axios.post(`/job/apply/${id}`);

      if (response.data.success || response.data.application) {
        setHasApplied(true);
        setApplicationStatus("submited");
        setApplyMessage("Successfully applied to the job");
      } else {
        setApplyMessage(response.data.message || "Failed to apply for job");
      }
    } catch (err) {
      console.error(err);
      setApplyMessage(
        err.response?.data?.message || "An error occurred while applying"
      );
    } finally {
      setApplyLoading(false);
    }
  };

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const response = await axios.get(`/application/get/${id}`);
        if (response.data.success) {
          if (response.data.data && response.data.data.status) {
            setApplicationStatus(response.data.data.status);
          }
        }
      } catch (error) {
        console.log("Error checking application status:", error);
      }
    };
    checkApplicationStatus();
  }, [axios, id]);

  const shareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.companyId?.name || "Company"}`,
        text: `Check out this job opportunity: ${job.title} at ${
          job.companyId?.name || "Company"
        }`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setApplyMessage("Job link copied to clipboard");
      setTimeout(() => setApplyMessage(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
          <div className="text-lg font-medium text-blue-700">
            Loading job details...
          </div>
          <p className="text-sm text-blue-400 mt-2">
            Fetching the perfect opportunity for you
          </p>
        </motion.div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto">
            <svg
              className="w-full h-full text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <div className="text-xl font-medium text-red-600 mt-4">
            {error || "Job not found"}
          </div>
          <p className="text-red-400 mt-2">
            Please try again or explore other job listings
          </p>
        </motion.div>
      </div>
    );
  }

  // Format salary range
  const formatSalary = (min, max) => {
    const formatIndianCurrency = (amount) => {
      if (amount >= 10000000) {
        // For amounts >= 1 crore
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
      } else if (amount >= 100000) {
        // For amounts >= 1 lakh
        return `₹${(amount / 100000).toFixed(2)} L`;
      } else {
        // For smaller amounts
        return `₹${amount.toLocaleString("en-IN")}`;
      }
    };

    return `${formatIndianCurrency(min)} - ${formatIndianCurrency(
      max
    )} per year`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days until deadline
  const getDaysUntilDeadline = (deadlineStr) => {
    const today = new Date();
    const deadline = new Date(deadlineStr);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 md:p-6 flex flex-col items-center font-sans"
    >
      <main className="w-full max-w-6xl flex flex-col md:flex-row mt-4 md:mt-6 gap-6">
        <Left
          applyLoading={applyLoading}
          applyMessage={applyMessage}
          formatDate={formatDate}
          formatSalary={formatSalary}
          getDaysUntilDeadline={getDaysUntilDeadline}
          hasApplied={hasApplied}
          job={job}
          applyJob={applyJob}
          shareJob={shareJob}
        />

        <Right
          applicationStatus={applicationStatus}
          applyJob={applyJob}
          job={job}
          applyLoading={applyLoading}
          formatDate={formatDate}
          formatSalary={formatSalary}
          hasApplied={hasApplied}
          shareJob={shareJob}
        />
      </main>
    </motion.div>
  );
};

export default JobDetails;
