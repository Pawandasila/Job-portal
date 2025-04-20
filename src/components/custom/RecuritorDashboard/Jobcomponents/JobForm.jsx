import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const JobForm = ({
  showJobModal,
  setJobFormData,
  setShowJobModal,
  resetFormAndCloseModal,
  selectedJob,
  handleSubmit,
  jobFormData,
  handleInputChange,
  companies,
  handleArrayInputChange,
}) => {
  return (
    <Dialog
      open={showJobModal}
      onOpenChange={(open) => {
        if (!open) {
          resetFormAndCloseModal();
        } else {
          setShowJobModal(open);
        }
      }}
    >
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedJob ? "Edit Job Listing" : "Create New Job Listing"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Job Title
              </label>
              <Input
                id="title"
                name="title"
                value={jobFormData.title}
                onChange={handleInputChange}
                placeholder="Senior Software Engineer"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="companyId" className="text-sm font-medium">
                Company
              </label>
              <Select
                name="companyId"
                value={jobFormData.companyId}
                onValueChange={(value) =>
                  setJobFormData({ ...jobFormData, companyId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Job Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={jobFormData.description}
              onChange={handleInputChange}
              placeholder="Detailed job description..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="location.city" className="text-sm font-medium">
                City
              </label>
              <Input
                id="location.city"
                name="location.city"
                value={jobFormData.location.city}
                onChange={handleInputChange}
                placeholder="New York"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location.state" className="text-sm font-medium">
                State
              </label>
              <Input
                id="location.state"
                name="location.state"
                value={jobFormData.location.state}
                onChange={handleInputChange}
                placeholder="NY"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location.country" className="text-sm font-medium">
                Country
              </label>
              <Input
                id="location.country"
                name="location.country"
                value={jobFormData.location.country}
                onChange={handleInputChange}
                placeholder="USA"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="location.jobType" className="text-sm font-medium">
                Job Type
              </label>
              <Select
                name="location.jobType"
                value={jobFormData.location.jobType}
                onValueChange={(value) =>
                  setJobFormData({
                    ...jobFormData,
                    location: { ...jobFormData.location, jobType: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="applicationDeadline"
                className="text-sm font-medium"
              >
                Application Deadline
              </label>
              <Input
                id="applicationDeadline"
                name="applicationDeadline"
                type="date"
                value={jobFormData.applicationDeadline}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="min_salary" className="text-sm font-medium">
                Minimum Salary ($)
              </label>
              <Input
                id="min_salary"
                name="min_salary"
                type="number"
                value={jobFormData.min_salary}
                onChange={handleInputChange}
                placeholder="50000"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="max_salary" className="text-sm font-medium">
                Maximum Salary ($)
              </label>
              <Input
                id="max_salary"
                name="max_salary"
                type="number"
                value={jobFormData.max_salary}
                onChange={handleInputChange}
                placeholder="100000"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="openings" className="text-sm font-medium">
                Number of Openings
              </label>
              <Input
                id="openings"
                name="openings"
                type="number"
                value={jobFormData.openings}
                onChange={handleInputChange}
                min="1"
                placeholder="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="skills" className="text-sm font-medium">
              Required Skills (comma separated)
            </label>
            <Input
              id="skills"
              name="skills"
              value={
                Array.isArray(jobFormData.skills)
                  ? jobFormData.skills.join(", ")
                  : jobFormData.skills
              }
              onChange={(e) => handleArrayInputChange(e, "skills")}
              placeholder="React, Node.js, TypeScript"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="requirement" className="text-sm font-medium">
              Requirements (comma separated)
            </label>
            <Textarea
              id="requirement"
              name="requirement"
              value={
                Array.isArray(jobFormData.requirement)
                  ? jobFormData.requirement.join(", ")
                  : jobFormData.requirement
              }
              onChange={(e) => handleArrayInputChange(e, "requirement")}
              placeholder="3+ years experience, Bachelor's degree, Team player"
              rows={3}
            />
          </div>
        </form>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={resetFormAndCloseModal}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {selectedJob ? "Update Job" : "Create Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobForm;
