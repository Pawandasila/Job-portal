import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Plus } from "lucide-react";
import JobActionDropdown from "./JobActionDropdown";

const RenderJobCards = ({
  isLoading,
  error,
  filteredJobs,
  openJobModal,
  handleJobStatusChange,
  confirmDeleteJob,
  formatDate,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64 p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64 p-8">
        <div className="flex flex-col items-center gap-2 text-destructive">
          <span className="text-4xl">!</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-8 bg-muted/30 rounded-lg">
        <p className="text-lg mb-4 text-muted-foreground">
          No jobs found in this category
        </p>
        <Button onClick={() => openJobModal()} className="gap-2">
          <Plus size={16} /> Create New Job
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 p-6 bg-muted/10 rounded-lg">
      {filteredJobs.map((job) => (
        <Card
          key={job._id}
          className="flex flex-col hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-semibold">
                  {job.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  {job.location?.city}, {job.location?.state},{" "}
                  {job.location?.country}
                </CardDescription>
              </div>
              <Badge
                variant={job.status === "open" ? "default" : "outline"}
                className="capitalize"
              >
                {job.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-grow pt-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">Type</span>
                <Badge variant="secondary" className="capitalize">
                  {job.location?.jobType || "N/A"}
                </Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">Salary</span>
                <span className="text-sm">
                  ${job.min_salary?.toLocaleString() || 0} - $
                  {job.max_salary?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">Openings</span>
                <span className="text-sm">{job.openings || 0}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">Applications</span>
                <span className="text-sm">{job.applicants || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Deadline</span>
                <span className="text-sm font-medium text-amber-600">
                  {formatDate(job.applicationDeadline)}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => navigate(`/jobDetails/${job._id}`)}
            >
              <Eye className="mr-1 h-4 w-4" /> View
            </Button>

            <JobActionDropdown
              job={job}
              onStatusChange={handleJobStatusChange}
              onEdit={openJobModal}
              onDelete={confirmDeleteJob}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RenderJobCards;
