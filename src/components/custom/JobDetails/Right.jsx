import React from 'react'
import { motion } from "framer-motion";
import QuickApply from './Rightsub/QuickApply';
import JobOverview from './Rightsub/JobOverview';
import ApplicationTips from './Rightsub/ApplicationTips';
import DownloadResume from './Rightsub/DownloadResume';


const Right = ({job , applicationStatus , hasApplied , applyJob , applyLoading ,shareJob , formatSalary , formatDate }) => {
  return (
    <div className="w-full md:w-1/3 space-y-6">

    <QuickApply applicationStatus={applicationStatus} applyJob={applyJob} applyLoading={applyLoading} hasApplied={hasApplied} job={job} shareJob={shareJob} />

    
   <JobOverview formatDate={formatDate} formatSalary={formatSalary} job={job} />

    
    {/* <SimilarJobs job={job} /> */}

    
   <ApplicationTips job={job}/>

    <DownloadResume job={job}/>
   
  </div>
  )
}

export default Right