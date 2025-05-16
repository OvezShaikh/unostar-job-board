import { useState } from "react";
import jobsData from "../jobs.json";
import images from "../constants/images";
import JobApplicationModal from "./JobApplicationModal";

export default function JobBoard() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6 font-sans flex flex-col items-center justify-center">
      <img src={images.logo} alt="Unostar Logo" className="mx-auto mb-8 w-36 drop-shadow-md" />
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 tracking-tight mb-12">
        Unostar Job Board
      </h1>

      <div className={`grid md:grid-cols-2 gap-8 max-w-6xl mx-auto p-6 transition-opacity ${selectedJob ? "blur-sm" : ""}`}>
        {jobsData.map((job) => (
          <article
            key={job.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border transition duration-300 flex flex-col justify-between"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
            <p className="text-sm text-gray-500 mb-3">{job.location} | {job.type}</p>
            <p className="text-gray-700 text-sm line-clamp-3 mb-5">{job.description}</p>
            <button
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-600 shadow w-[50%] justify center mx-auto transition duration-300 ease-in-out"
              onClick={() => setSelectedJob(job)}
            >
              Apply Now
            </button>
          </article>
        ))}
      </div>

      {/* Modal for applying */}
      <JobApplicationModal
        isOpen={!!selectedJob}
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}
