import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import RenderJobCards from "./JobCard";
import RenderJobTable from "./JobTable";

const JobTabs = ({
  selectedView,
  setSelectedView,
  activeJobsCount,
  closedJobsCount,
  deletedJobsCount,
  allJobsCount,
  error,
  filteredJobs,
  openJobModal,
  handleJobStatusChange,
  confirmDeleteJob,
  formatDate,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <Tabs
        defaultValue="active"
        value={selectedView}
        onValueChange={setSelectedView}
        className="w-full"
      >
        {/* Tabs Header */}
        <div className="border-b">
          <div className="px-4">
            <TabsList className="h-12 w-full justify-start rounded-none bg-transparent border-b-0 gap-6">
              <TabsTrigger
                value="active"
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-2 pb-3 pt-2"
              >
                Active Jobs
                <Badge variant="secondary" className="ml-2">
                  {activeJobsCount}
                </Badge>
              </TabsTrigger>

              <TabsTrigger
                value="closed"
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-2 pb-3 pt-2"
              >
                Closed Jobs
                <Badge variant="secondary" className="ml-2">
                  {closedJobsCount}
                </Badge>
              </TabsTrigger>

              <TabsTrigger
                value="deleted"
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-2 pb-3 pt-2"
              >
                Deleted Jobs
                <Badge variant="secondary" className="ml-2">
                  {deletedJobsCount}
                </Badge>
              </TabsTrigger>

              <TabsTrigger
                value="all"
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-2 pb-3 pt-2"
              >
                All Jobs
                <Badge variant="secondary" className="ml-2">
                  {allJobsCount}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Contents */}
        <TabsContent value="active" className="mt-0">
          <RenderJobCards
            confirmDeleteJob={confirmDeleteJob}
            error={error}
            filteredJobs={filteredJobs}
            handleJobStatusChange={handleJobStatusChange}
            isLoading={isLoading}
            openJobModal={openJobModal}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="closed" className="mt-0">
          <RenderJobCards
            confirmDeleteJob={confirmDeleteJob}
            error={error}
            filteredJobs={filteredJobs}
            handleJobStatusChange={handleJobStatusChange}
            isLoading={isLoading}
            openJobModal={openJobModal}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="deleted" className="mt-0 p-4">
          <RenderJobTable
            confirmDeleteJob={confirmDeleteJob}
            error={error}
            filteredJobs={filteredJobs}
            handleJobStatusChange={handleJobStatusChange}
            isLoading={isLoading}
            openJobModal={openJobModal}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="all" className="mt-0 p-4">
          <RenderJobTable
            confirmDeleteJob={confirmDeleteJob}
            error={error}
            filteredJobs={filteredJobs}
            handleJobStatusChange={handleJobStatusChange}
            isLoading={isLoading}
            openJobModal={openJobModal}
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobTabs;
