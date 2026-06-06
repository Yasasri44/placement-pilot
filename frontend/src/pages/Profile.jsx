import { useEffect, useState } from "react";

import "../styles/Profile.css";

import {
  getCurrentUser
} from "../services/userService";

import {
  getMyApplications
} from "../services/applicationService";

import {
  getMyResumes
} from "../services/resumeService";

function Profile() {

  const [user, setUser] =
    useState(null);

  const [applications,
         setApplications] =
         useState([]);

  const [resumes,
         setResumes] =
         useState([]);

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const userData =
            await getCurrentUser();

          const appData =
            await getMyApplications();

          const resumeData =
            await getMyResumes();

          setUser(userData);

          setApplications(
            appData
          );

          setResumes(
            resumeData
          );

        } catch(error) {

          console.log(error);
        }
      };

    loadData();

  }, []);

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

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>
          {user?.name}
        </h1>

        <p>
          {user?.email}
        </p>

      </div>

      <div className="profile-stats">

        <div className="profile-stat">
          <h2>
            {resumes.length}
          </h2>
          <p>Resumes</p>
        </div>

        <div className="profile-stat">
          <h2>
            {applications.length}
          </h2>
          <p>Applications</p>
        </div>

        <div className="profile-stat">
          <h2>
            {interviews}
          </h2>
          <p>Interviews</p>
        </div>

        <div className="profile-stat">
          <h2>
            {selected}
          </h2>
          <p>Selected</p>
        </div>

        <div className="profile-stat">
          <h2>
            {rejected}
          </h2>
          <p>Rejected</p>
        </div>

      </div>

      <div className="achievement-card">

        <h2>
          🏆 Placement Journey
        </h2>

        <p>
          Keep applying consistently.
          Every application increases
          your chances of success.
        </p>

      </div>

    </div>
  );
}

export default Profile;