import { useEffect, useState } from "react";
import "../styles/Applications.css";

import {
  getMyApplications,
  createApplication,
  deleteApplication,
  updateApplicationStatus
} from "../services/applicationService";

import {
  getMyResumes
} from "../services/resumeService";

function Applications() {

  const companyLogos = {
    Amazon: "🟠",
    Google: "🟡",
    Microsoft: "🔵",
    Oracle: "🔴",
    TCS: "🟣",
    Infosys: "🟢",
    AutoRABIT: "🟤"
  };

  const [applications, setApplications] =
    useState([]);

  const [resumes, setResumes] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [formData, setFormData] =
    useState({
      companyName: "",
      role: "",
      jobDescription: "",
      status: "APPLIED",
      appliedDate: "",
      jobLink: "",
      notes: "",
      resumeId: ""
    });

  const loadApplications =
    async () => {

      try {

        const data =
          await getMyApplications();

        setApplications(data);

      } catch (error) {

        console.log(error);
      }
    };

  const loadResumes =
    async () => {

      try {

        const data =
          await getMyResumes();

        setResumes(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    loadApplications();
    loadResumes();

  }, []);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async () => {

      if (resumes.length === 0) {

        alert(
          "Please upload a resume first."
        );

        return;
      }

      try {

        await createApplication(
          formData
        );

        alert(
          "Application Added 🚀"
        );

        loadApplications();

        setShowForm(false);

        setFormData({
          companyName: "",
          role: "",
          jobDescription: "",
          status: "APPLIED",
          appliedDate: "",
          jobLink: "",
          notes: "",
          resumeId: ""
        });

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create application"
        );
      }
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this application?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        await deleteApplication(id);

        loadApplications();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete application"
        );
      }
    };

  const handleEdit =
    async (app) => {

      const newStatus =
        prompt(
          "Enter Status:\nAPPLIED\nOA_CLEARED\nINTERVIEW\nSELECTED\nREJECTED",
          app.status
        );

      if (!newStatus) {
        return;
      }

      try {

        await updateApplicationStatus(
          app.id,
          newStatus
        );

        loadApplications();

      } catch (error) {

        console.log(error);

        alert(
          "Update Failed"
        );
      }
    };

  const interviews =
    applications.filter(
      app =>
        app.status ===
        "INTERVIEW"
    ).length;

  const selected =
    applications.filter(
      app =>
        app.status ===
        "SELECTED"
    ).length;

  const rejected =
    applications.filter(
      app =>
        app.status ===
        "REJECTED"
    ).length;

  return (

    <div className="applications-page">

      <div className="hero-section">

        <div>

          <h1>
            🚀 Application Tracker
          </h1>

          <p>
            Track smarter.
            Prepare better.
            Get placed faster.
          </p>

        </div>

        <button
          className="add-btn"
          onClick={() =>
            setShowForm(
              !showForm
            )
          }
        >
          + Add Application
        </button>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Applications</h3>
          <h2>{applications.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Interviews</h3>
          <h2>{interviews}</h2>
        </div>

        <div className="stat-card">
          <h3>Selected</h3>
          <h2>{selected}</h2>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <h2>{rejected}</h2>
        </div>

      </div>

      {resumes.length === 0 ? (

        <div className="no-resume-card">

          <h2>
            📄 Upload a Resume First
          </h2>

          <p>
            Before tracking applications,
            upload at least one resume.
          </p>

          <button
            onClick={() =>
              window.location.href =
              "/resumes"
            }
          >
            Go To Resume Vault
          </button>

        </div>

      ) : (

        showForm && (

          <div className="application-form">

            <h2>
              Add Application
            </h2>

            <input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />

            <input
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
            />

            <textarea
              name="jobDescription"
              placeholder="Job Description"
              value={formData.jobDescription}
              onChange={handleChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>APPLIED</option>
              <option>OA_CLEARED</option>
              <option>INTERVIEW</option>
              <option>SELECTED</option>
              <option>REJECTED</option>
            </select>

            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
            />

            <input
              name="jobLink"
              placeholder="Job Link"
              value={formData.jobLink}
              onChange={handleChange}
            />

            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
            />

            <select
              name="resumeId"
              value={formData.resumeId}
              onChange={handleChange}
            >

              <option value="">
                Select Resume
              </option>

              {resumes.map(
                resume => (

                  <option
                    key={resume.id}
                    value={resume.id}
                  >
                    {resume.resumeName}
                  </option>

                )
              )}

            </select>

            <button
              className="save-btn"
              onClick={handleSubmit}
            >
              Save Application
            </button>

          </div>

        )

      )}

      <h2 className="section-title">
        My Applications
      </h2>

      <div className="applications-grid">

        {applications.map(
          app => (

            <div
              key={app.id}
              className="application-card"
            >

              <div className="company-header">

                <div className="company-logo">

                  {
                    companyLogos[
                      app.companyName
                    ] || "🚀"
                  }

                </div>

                <div>

                  <h3>
                    {app.companyName}
                  </h3>

                  <p>
                    {app.role}
                  </p>

                </div>

              </div>

              <div className="card-details">

                <p>
                  📅 Applied:
                  {" "}
                  {app.appliedDate}
                </p>

                <span
                  className={
                    "status-badge " +
                    app.status.toLowerCase()
                  }
                >
                  {app.status}
                </span>

              </div>

              <div className="card-actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(app)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(app.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default Applications;