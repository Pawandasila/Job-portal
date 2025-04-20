import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AuthContext } from "@/context/authContext";
import useAxios from "@/hooks/useAxios";

import DeleteBox from "./Jobcomponents/DeleteBox";
import JobForm from "./Jobcomponents/JobForm";
import JobTabs from "./Jobcomponents/Tabs";

const DEFAULT_FORM_STATE = {
  title: "",
  description: "",
  companyId: "",
  location: {
    city: "",
    state: "",
    country: "",
    jobType: "onsite",
  },
  requirement: [],
  skills: [],
  applicationDeadline: "",
  min_salary: 0,
  max_salary: 0,
  openings: 1,
};

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedView, setSelectedView] = useState("active");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobFormData, setJobFormData] = useState(DEFAULT_FORM_STATE);

  const { user } = useContext(AuthContext);
  const axios = useAxios();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [jobsResponse, companiesResponse] = await Promise.all([
          axios.get(`/jobs/user/${user?.id}`),
          axios.get("/companies").catch(() => ({
            data: { companies: [{ _id: "1", name: "Tech Corp" }, { _id: "2", name: "Dev Solutions" }] },
          })),
        ]);

        if (isMounted) {
          setJobs(jobsResponse?.data?.jobs || []);
          setCompanies(companiesResponse?.data?.companies || []);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load data. Please try again later.");
          setJobs([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [axios, user?.id]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setJobFormData((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  const handleArrayInputChange = useCallback((e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setJobFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setJobFormData(DEFAULT_FORM_STATE);
    setSelectedJob(null);
  }, []);

  const resetFormAndCloseModal = useCallback(() => {
    resetForm();
    setShowJobModal(false);
  }, [resetForm]);

  const openJobModal = useCallback((job = null) => {
    if (job) {
      setSelectedJob({ ...job });

      setJobFormData({
        ...job,
        applicationDeadline: job.applicationDeadline
          ? new Date(job.applicationDeadline).toISOString().split("T")[0]
          : "",
        requirement: Array.isArray(job.requirement)
          ? job.requirement.join(", ")
          : job.requirement || "",
        skills: Array.isArray(job.skills)
          ? job.skills.join(", ")
          : job.skills || "",
      });
    } else {
      resetForm();
    }
    setShowJobModal(true);
  }, [resetForm]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const requirementArray = Array.isArray(jobFormData.requirement)
          ? jobFormData.requirement
          : jobFormData.requirement.split(",").map((item) => item.trim());

        const skillsArray = Array.isArray(jobFormData.skills)
          ? jobFormData.skills
          : jobFormData.skills.split(",").map((item) => item.trim());

        const jobData = {
          ...jobFormData,
          createdBy: user?.id,
          requirement: requirementArray,
          skills: skillsArray,
        };

        if (selectedJob) {
          const response = await axios.put(`/job/${selectedJob._id}`, jobData);

          const updatedJob = {
            ...selectedJob,
            ...jobData,
            ...(response.data?.job || {}),
          };

          setJobs((prev) =>
            prev.map((job) =>
              job._id === selectedJob._id ? updatedJob : job
            )
          );
        } else {
          const response = await axios.post("/job/create", jobData);

          const newJob = response?.data?.job || {
            ...jobData,
            _id: `temp-${Date.now()}`,
            status: "open",
            isDelete: "No",
            applicants: 0,
            postedDate: new Date(),
          };

          setJobs((prev) => [...prev, newJob]);
        }

        resetFormAndCloseModal();
      } catch {
        alert("Failed to save job. Please try again.");
      }
    },
    [axios, jobFormData, selectedJob, resetFormAndCloseModal, user?.id]
  );

  const confirmDeleteJob = useCallback((jobId) => {
    setJobToDelete(jobId);
    setShowDeleteAlert(true);
  }, []);

  const handleDeleteJob = useCallback(async () => {
    try {
      await axios.post(`/job/delete/${jobToDelete}`);
    } catch {
      // Optimistic update
    } finally {
      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobToDelete ? { ...job, isDelete: "Yes" } : job
        )
      );
      setShowDeleteAlert(false);
    }
  }, [axios, jobToDelete]);

  const handleJobStatusChange = useCallback(
    async (jobId, action) => {
      try {
        if (action === "close") {
          await axios.post(`/job/close/${jobId}`);
        } else {
          await axios.post(`/job/reopen/${jobId}`);
        }

        setJobs((prev) =>
          prev.map((job) =>
            job._id === jobId
              ? { ...job, status: action === "close" ? "closed" : "open" }
              : job
          )
        );
      } catch {
        // Same optimistic update on error
        setJobs((prev) =>
          prev.map((job) =>
            job._id === jobId
              ? { ...job, status: action === "close" ? "closed" : "open" }
              : job
          )
        );
      }
    },
    [axios]
  );

  const formatDate = useCallback((date) => {
    if (!date) return "N/A";
    try {
      return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date));
    } catch {
      return "Invalid Date";
    }
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${job.location?.city || ""}, ${job.location?.state || ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      if (selectedView === "active")
        return job.status === "open" && job.isDelete === "No" && matchesSearch;
      if (selectedView === "closed")
        return (
          job.status === "closed" && job.isDelete === "No" && matchesSearch
        );
      if (selectedView === "deleted")
        return job.isDelete === "Yes" && matchesSearch;
      return matchesSearch;
    });
  }, [jobs, searchTerm, selectedView]);

  const { activeJobsCount, closedJobsCount, deletedJobsCount, allJobsCount } =
    useMemo(() => {
      return {
        activeJobsCount: jobs.filter(
          (job) => job.status === "open" && job.isDelete === "No"
        ).length,
        closedJobsCount: jobs.filter(
          (job) => job.status === "closed" && job.isDelete === "No"
        ).length,
        deletedJobsCount: jobs.filter((job) => job.isDelete === "Yes").length,
        allJobsCount: jobs.length,
      };
    }, [jobs]);

  return (
    <div className="container max-w-7xl mx-auto py-6">
      <div className="mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Manage Jobs</h1>
          <Button onClick={() => openJobModal()} className="gap-2">
            <Plus className="h-4 w-4" /> Create New Job
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active Jobs</SelectItem>
              <SelectItem value="closed">Closed Jobs</SelectItem>
              <SelectItem value="deleted">Deleted Jobs</SelectItem>
              <SelectItem value="all">All Jobs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <JobTabs
        activeJobsCount={activeJobsCount}
        allJobsCount={allJobsCount}
        closedJobsCount={closedJobsCount}
        confirmDeleteJob={confirmDeleteJob}
        deletedJobsCount={deletedJobsCount}
        error={error}
        filteredJobs={filteredJobs}
        formatDate={formatDate}
        handleJobStatusChange={handleJobStatusChange}
        openJobModal={openJobModal}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        isLoading={isLoading}
      />

      <JobForm
        companies={companies}
        handleArrayInputChange={handleArrayInputChange}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        jobFormData={jobFormData}
        resetFormAndCloseModal={resetFormAndCloseModal}
        selectedJob={selectedJob}
        setJobFormData={setJobFormData}
        setShowJobModal={setShowJobModal}
        showJobModal={showJobModal}
      />

      <DeleteBox
        handleDeleteJob={handleDeleteJob}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </div>
  );
};

export default RecruiterJobs;
