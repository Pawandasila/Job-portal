import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Eye, Pencil, Plus, Trash2, XCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RenderJobTable = ({
  isLoading,
  error,
  filteredJobs,
  openJobModal,
  handleJobStatusChange,
  confirmDeleteJob,
  formatDate
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
      <div className="flex justify-center p-8 text-destructive">
        <div className="flex flex-col items-center gap-2">
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="font-medium">Title</TableHead>
            <TableHead className="font-medium">Location</TableHead>
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Salary Range</TableHead>
            <TableHead className="font-medium">Openings</TableHead>
            <TableHead className="font-medium">Applications</TableHead>
            <TableHead className="font-medium">Deadline</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.map((job) => (
            <TableRow key={job._id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>
                {job.location?.city}, {job.location?.state}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {job.location?.jobType || "N/A"}
                </Badge>
              </TableCell>
              <TableCell>
                ${job.min_salary?.toLocaleString() || 0} - $
                {job.max_salary?.toLocaleString() || 0}
              </TableCell>
              <TableCell>{job.openings || 0}</TableCell>
              <TableCell>{job.applicants || 0}</TableCell>
              <TableCell>{formatDate(job.applicationDeadline)}</TableCell>
              <TableCell>
                <Badge
                  variant={job.status === "open" ? "default" : "outline"}
                  className="capitalize"
                >
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/jobDetails/${job._id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {job.status === "open" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJobStatusChange(job._id, "close")}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJobStatusChange(job._id, "reopen")}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openJobModal(job)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => confirmDeleteJob(job._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RenderJobTable;
