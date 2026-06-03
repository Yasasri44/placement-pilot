import "../styles/RecentApplications.css";
import { useEffect, useState } from "react";
import { getMyApplications }
from "../services/applicationService";

function RecentApplications() {

  const [applications,
    setApplications] =
    useState([]);

  useEffect(() => {

    const loadApplications =
      async () => {

        try {

          const data =
            await getMyApplications();

          setApplications(data);

        } catch(error) {

          console.log(error);
        }
      };

    loadApplications();

  }, []);

  return (

    <div className="recent-section">

      <div className="recent-header">

        <h2>
          Recent Applications
        </h2>

      </div>

      {applications.length === 0 ? (

        <div
          className="empty-applications"
        >
          🚀 No applications yet.
          Start tracking your first application.
        </div>

      ) : (

        applications
          .slice(0, 5)
          .map((app) => (

            <div
              key={app.id}
              className="application-row"
            >

              <div>

                <h3>
                  {app.companyName}
                </h3>

                <p>
                  {app.role}
                </p>

              </div>

              <span
                className={
                  "status-badge " +
                  app.status
                    .toLowerCase()
                }
              >
                {app.status}
              </span>

            </div>

          ))

      )}

    </div>

  );
}

export default RecentApplications;