import { AuthContext } from "@/context/authContext";
import useAxios from "@/hooks/useAxios";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  CheckCircle,
  XCircle,
  BriefcaseIcon,
  UserIcon,
  DownloadIcon,
  SearchIcon,
  SlidersHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const RecruiterApplications = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/application/job/${user?.id}`);
      console.log(response.data.data);
      if (response.data.success) {
        setApplications(response.data.data);
        setFilteredApplications(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchApplications();
    }
  }, [axios, user]);

  const backendBaseUrl = import.meta.env.VITE_BASE_URL;

  const getFormattedImageUrl = (photoPath) => {
    if (!photoPath) return "";

    return photoPath.startsWith("/uploads/")
      ? `${backendBaseUrl}${photoPath}`
      : photoPath;
  };

  useEffect(() => {
    let filtered = [...applications];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.jobseekerId.user_id.firstName
            .toLowerCase()
            .includes(searchLower) ||
          app.jobseekerId.user_id.lastName
            .toLowerCase()
            .includes(searchLower) ||
          app.jobId.title.toLowerCase().includes(searchLower) ||
          app.jobseekerId.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower)
          )
      );
    }

    setFilteredApplications(filtered);
  }, [statusFilter, searchTerm, applications]);

  const handleAction = (application, action) => {
    setSelectedApplication(application);
    setActionType(action);
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    setActionLoading(true);
    try {
      const status =
        actionType === "shortlist"
          ? "shortlist"
          : actionType === "hire"
          ? "hired"
          : "reject";
      const response = await axios.patch(
        `/application/job/${selectedApplication._id}`,
        {
          status,
        }
      );

      if (response.data) {
        // Update the local state with the updated application
        const updatedApplications = applications.map((app) =>
          app._id === selectedApplication._id ? { ...app, status } : app
        );
        setApplications(updatedApplications);
      }
    } catch (error) {
      console.error(`Error ${actionType} application:`, error);
      setError(`Failed to ${actionType} application. Please try again.`);
    } finally {
      setActionLoading(false);
      setDialogOpen(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Submitted
          </Badge>
        );
      case "shortlist":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Shortlisted
          </Badge>
        );
      case "reject":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Rejected
          </Badge>
        );
      case "hired":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Hired
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} (${formatDistance(date, new Date(), {
      addSuffix: true,
    })})`;
  };

  // Get count of applications by status
  const getStatusCount = (status) => {
    if (status === "all") return applications.length;
    return applications.filter((app) => app.status === status).length;
  };

  const exportToCSV = () => {
    // Define more comprehensive headers
    const headers = [
      "Applicant Name",
      "Email",
      "Phone Number",
      "Location",
      "Job Position",
      "Job Location",
      "Skills",
      "Years of Experience",
      "Education",
      "Expected Salary",
      "Application Date",
      "Status",
      "Languages",
      "Latest Role",
      "Latest Company",
    ];

    const csvData = filteredApplications.map((app) => {
      // Get education information
      const education =
        app.jobseekerId.education && app.jobseekerId.education.length > 0
          ? `${app.jobseekerId.education[0].level} in ${app.jobseekerId.education[0].field_of_study} from ${app.jobseekerId.education[0].institution}`
          : "Not specified";

      // Get latest work experience
      const latestExperience =
        app.jobseekerId.work_experience &&
        app.jobseekerId.work_experience.length > 0
          ? app.jobseekerId.work_experience[0]
          : null;

      // Format expected salary range
      const expectedSalary = app.jobseekerId.expected_salary
        ? `${app.jobseekerId.expected_salary.currency} ${app.jobseekerId.expected_salary.min}-${app.jobseekerId.expected_salary.max}`
        : "Not specified";

      return [
        `${app.jobseekerId.user_id.firstName} ${app.jobseekerId.user_id.lastName}`,
        app.jobseekerId.user_id.email,
        app.jobseekerId.user_id.phonenumber || "Not provided",
        `${app.jobseekerId.location.city}, ${app.jobseekerId.location.state}, ${app.jobseekerId.location.country}`,
        app.jobId.title,
        `${app.jobId.location.city}, ${app.jobId.location.state}, ${app.jobId.location.country} (${app.jobId.location.jobType})`,
        app.jobseekerId.skills.join(", "),
        `${app.jobseekerId.years_of_experience} years`,
        education,
        expectedSalary,
        new Date(app.applicationDate).toLocaleDateString(),
        app.status.charAt(0).toUpperCase() + app.status.slice(1), // Capitalize status
        app.jobseekerId.languages
          ? app.jobseekerId.languages.join(", ")
          : "Not specified",
        latestExperience ? latestExperience.role : "Not specified",
        latestExperience ? latestExperience.company : "Not specified",
      ];
    });

    // Function to escape CSV values
    const escapeCSV = (data) => {
      if (data === null || data === undefined) return "";
      return typeof data === "string" ? `"${data.replace(/"/g, '""')}"` : data;
    };

    // Process rows with proper CSV escaping
    const processedData = csvData.map((row) => row.map(escapeCSV).join(","));

    // Create CSV content
    const csvContent = [headers.join(","), ...processedData].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);

    // Include date and time in the filename
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");

    link.setAttribute("download", `job-applications-${dateStr}-${timeStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading applications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700 border border-red-200">
        <p>{error}</p>
        <Button variant="outline" className="mt-2" onClick={fetchApplications}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="bg-slate-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Applications Management
              </CardTitle>
              <CardDescription>
                Manage job applications from candidates
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {filteredApplications.length}{" "}
              {filteredApplications.length === 1
                ? "Application"
                : "Applications"}
            </Badge>
          </div>
        </CardHeader>

        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === "all" ? "selected" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className="flex items-center"
              >
                All ({getStatusCount("all")})
              </Button>
              <Button
                variant={statusFilter === "submitted" ? "selected" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("submitted")}
                className="flex items-center text-blue-700"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></div>
                Submitted ({getStatusCount("submitted")})
              </Button>
              <Button
                variant={statusFilter === "shortlist" ? "selected" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("shortlist")}
                className="flex items-center text-green-700"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                Shortlisted ({getStatusCount("shortlist")})
              </Button>
              <Button
                variant={statusFilter === "reject" ? "selected" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("reject")}
                className="flex items-center text-red-700"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                Rejected ({getStatusCount("reject")})
              </Button>
              <Button
                variant={statusFilter === "hired" ? "selected" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("hired")}
                className="flex items-center text-purple-700"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-1.5"></div>
                Hired ({getStatusCount("hired")})
              </Button>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, job, or skills"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size=""
                onClick={exportToCSV}
                title="Export filtered applications"
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          {filteredApplications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-2 text-lg font-medium">
                No applications found
              </h3>
              <p className="mt-1">
                {applications.length > 0
                  ? "Try changing your filters to see more results."
                  : "When candidates apply for your job postings, they'll appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="items-center">Applicant</TableHead>
                    <TableHead className="items-center">Job Position</TableHead>
                    <TableHead className="items-center">Skills</TableHead>
                    <TableHead className="items-center">Experience</TableHead>
                    <TableHead className="items-center">Applied On</TableHead>
                    <TableHead className="items-center">Status</TableHead>
                    <TableHead className="items-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {application.jobseekerId.photo ? (
                            <img
                              src={getFormattedImageUrl(
                                application.jobseekerId.photo
                              )}
                              alt="Applicant"
                              className="h-8 w-8 rounded-full mr-2"
                            />
                          ) : (
                            <UserIcon className="h-8 w-8 p-1 bg-slate-100 rounded-full mr-2" />
                          )}
                          <div>
                            <div className="font-medium">
                              {application.jobseekerId.user_id.firstName +
                                " " +
                                application.jobseekerId.user_id.lastName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {application.jobseekerId.location.city},{" "}
                              {application.jobseekerId.location.state}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {application.jobId.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {application.jobId.location.city},{" "}
                          {application.jobId.location.state}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {application.jobseekerId.skills
                            .slice(0, 3)
                            .map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          {application.jobseekerId.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{application.jobseekerId.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {application.jobseekerId.years_of_experience} years
                      </TableCell>
                      <TableCell>
                        {formatDate(application.applicationDate)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          {application.status === "submitted" ||
                          application.status === "shortlist" ||
                          application.status === "reject" ||
                          application.status === "hired" ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0 rounded-full"
                                >
                                  <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-36">
                                {application.status === "submitted" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAction(application, "shortlist")
                                      }
                                      className="cursor-pointer focus:bg-green-50"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                      <span className="text-gray-700">
                                        Shortlist
                                      </span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAction(application, "reject")
                                      }
                                      className="cursor-pointer focus:bg-red-50"
                                    >
                                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                      <span className="text-gray-700">
                                        Reject
                                      </span>
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {application.status === "shortlist" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleAction(application, "hire")
                                    }
                                    className="cursor-pointer focus:bg-purple-50"
                                  >
                                    <BriefcaseIcon className="h-4 w-4 mr-2 text-purple-500" />
                                    <span className="text-gray-700">Hire</span>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() =>
                                    window.open(
                                      `/recruiter-access/applicant-profile/${application.jobseekerId._id}`,
                                      "_blank"
                                    )
                                  }
                                  className="cursor-pointer"
                                >
                                  <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-gray-700">
                                    View Profile
                                  </span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <span className="text-sm text-gray-400 italic">
                              None
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "shortlist"
                ? "Shortlist this candidate?"
                : actionType === "reject"
                ? "Reject this application?"
                : "Hire this candidate?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "shortlist" &&
                "This will mark the candidate as shortlisted for further consideration."}
              {actionType === "reject" &&
                "This will mark the application as rejected. This action cannot be undone."}
              {actionType === "hire" &&
                "This will mark the candidate as hired for this position."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} disabled={actionLoading}>
              {actionLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RecruiterApplications;
