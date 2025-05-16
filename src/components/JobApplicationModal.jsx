import Modal from "react-modal";
import { useState, useEffect } from "react";

Modal.setAppElement("#root");

export default function JobApplicationModal({ isOpen, job, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (isOpen && job) {
      console.log("Modal opened with job:", job);
    }
  }, [isOpen, job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

    setIsSubmitting(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(",")[1];
        const form = e.target;

        const payload = {
          jobTitle: job.title,
          name: form.name.value,
          email: form.email.value,
          role: form.positionType.value,
          message: form.message.value,
          resumeFile: base64,
          resumeName: resume.name,
          resumeType: resume.type,
        };

        const response = await fetch(
          "/api/proxy",
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );


        const text = await response.text();
        console.log("Google Sheets response:", text);

        alert("Application submitted successfully!");
        onClose(); // close modal
      } catch (error) {
        console.error("Submission error:", error);
        alert("There was an error submitting the form.");
      } finally {
        setIsSubmitting(false);
      }
    };

    reader.readAsDataURL(resume);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="ReactModal__Overlay"
      className="ReactModal__Content"
      contentLabel={`Apply for ${job?.title || "Job"}`}
    >
      {job && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Apply for {job.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="Job Title" value={job.title} />

            <div>
              <label htmlFor="name" className="text-gray-700 font-medium">Full Name *</label>
              <input id="name" name="name" required className="mt-1 p-3 border rounded w-full" />
            </div>

            <div>
              <label htmlFor="email" className="text-gray-700 font-medium">Email *</label>
              <input id="email" name="email" type="email" required className="mt-1 p-3 border rounded w-full" />
            </div>

            <div>
              <label htmlFor="positionType" className="text-gray-700 font-medium">Preferred Role *</label>
              <select id="positionType" name="positionType" required className="mt-1 p-3 border rounded w-full">
                <option value="">Select a role</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="resume" className="text-gray-700 font-medium">Resume *</label>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={(e) => setResume(e.target.files[0])}
                className="mt-1 p-3 border rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-gray-700 font-medium">Cover Letter</label>
              <textarea id="message" name="message" className="mt-1 p-3 border rounded w-full min-h-[100px]" />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
