import "../styles/RecentApplications.css";

function RecentApplications() {

  const applications = [
    {
      company: "Google",
      role: "SWE Intern",
      status: "APPLIED"
    },
    {
      company: "Amazon",
      role: "Backend Intern",
      status: "INTERVIEW"
    },
    {
      company: "Microsoft",
      role: "SDE Intern",
      status: "REJECTED"
    }
  ];

  return (

    <div className="recent-section">

      <div className="recent-header">

        <h2>
          Recent Applications
        </h2>

      </div>

      {applications.map((app,index) => (

        <div
          key={index}
          className="application-row"
        >

          <div>

            <h3>{app.company}</h3>

            <p>{app.role}</p>

          </div>

          <span
            className={
              "status-badge " +
              app.status.toLowerCase()
            }
          >
            {app.status}
          </span>

        </div>

      ))}

    </div>
  );
}

export default RecentApplications;