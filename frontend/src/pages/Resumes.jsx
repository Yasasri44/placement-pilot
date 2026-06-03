import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Resumes.css";

function Resumes() {

  const [resumeName, setResumeName] = useState("");
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);

  const loadResumes = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/resumes/my",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setResumes(response.data);

    } catch(error) {

      console.log(error);
    }
  };

  useEffect(() => {

    loadResumes();

  }, []);

  const handleUpload = async () => {

    if(!resumeName || !file) {

      alert("Fill all fields");
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "resumeName",
      resumeName
    );

    formData.append(
      "file",
      file
    );

    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/resumes/upload",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Resume Uploaded 🚀");

      setResumeName("");
      setFile(null);

      loadResumes();

    } catch(error) {

      console.log(error);

      alert("Upload Failed");
    }
  };
  const handleDelete = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this resume?"
    );

  if(!confirmDelete) return;

  try {

    const token =
      localStorage.getItem("token");

    await api.delete(
      `/resumes/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    loadResumes();

  } catch(error) {

    console.log(error);

    alert("Delete Failed");
  }
};

  return (

    <div className="resumes-page">

      <div className="glow-purple"></div>
      <div className="glow-blue"></div>

      <div className="resume-hero">

        <div className="hero-left">

          <h1>
            📄 Resume Vault
          </h1>

          <p>
            Every offer letter begins
            with a well-crafted resume.
          </p>

        </div>

        <div className="hero-center">

          <div className="hero-stat">

            <h2>
              {resumes.length}
            </h2>

            <span>
              Resumes Uploaded
            </span>

          </div>

        </div>

        <div className="hero-right">
          🚀
        </div>

      </div>

      <div className="motivation-card">

        <h3>🎯 Resume Tip</h3>

        <p>
          Tailor your resume
          for every company you apply to.
        </p>

      </div>

      <div className="upload-card">

        <div className="upload-header">

          <h2>
            ⬆ Upload New Resume
          </h2>

          <p>
            PDF resumes only
          </p>

        </div>

        <div className="upload-row">

          <input
            type="text"
            placeholder="Resume Name"
            value={resumeName}
            onChange={(e) =>
              setResumeName(
                e.target.value
              )
            }
          />

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          <button
            onClick={handleUpload}
          >
            Upload Resume
          </button>

        </div>

      </div>

      <div className="resume-section-title">

        <h2>
          My Resume Collection
        </h2>

        <div className="resume-count">

          {resumes.length}
          {" "}
          Resumes Uploaded

        </div>

      </div>

      <div className="resume-grid">

        {resumes.map((resume) => (

          <div
            className="resume-card"
            key={resume.id}
          >

            <h3>
              📄 {resume.resumeName}
            </h3>

            <p>
              {resume.fileName}
            </p>

            <span className="resume-tag">
              ATS Ready
            </span>

            <div className="resume-actions">

              <button
                className="view-btn"
              >
                View
              </button>

              <button
  className="delete-btn"
  onClick={() =>
    handleDelete(resume.id)
  }
>
  Delete
</button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Resumes;