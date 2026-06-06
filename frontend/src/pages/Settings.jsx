import { useEffect, useState } from "react";
import "../styles/Settings.css";

import { getCurrentUser }
from "../services/userService";

function Settings() {

  const [user,
         setUser] =
         useState(null);

  useEffect(() => {

    const loadUser =
      async () => {

        try {

          const data =
            await getCurrentUser();

          setUser(data);

        } catch(error) {

          console.log(error);
        }
      };

    loadUser();

  }, []);

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href = "/";
  };

  return (

    <div className="settings-page">

      <h1>
        ⚙ Settings
      </h1>

      <div className="settings-card">

        <h2>
          👤 Account
        </h2>

        <p>
          <strong>Name:</strong>
          {" "}
          {user?.name}
        </p>

        <p>
          <strong>Email:</strong>
          {" "}
          {user?.email}
        </p>

      </div>

      <div className="settings-card">

        <h2>
          🔒 Security
        </h2>

        <button
          className="settings-btn"
        >
          Change Password
        </button>

      </div>

      <div className="settings-card">

        <h2>
          🎨 Preferences
        </h2>

        <p>
          Dark Mode
          (Coming Soon)
        </p>

      </div>

      <div className="settings-card">

        <h2>
          🚪 Account Actions
        </h2>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Settings;