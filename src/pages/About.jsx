import React from "react";

function About() {
  return (
    <div className="about-wrapper">

      <div className="about-card">

        <h2 className="about-heading">User Management System</h2>

        <p className="about-text">
          A modern React-based application designed to manage users with a clean UI and smooth experience.
        </p>

        <div className="about-grid">

          <div className="about-box">
            <h4>✨ Features</h4>
            <ul>
              <li>CRUD Operations</li>
              <li>Smart Validation</li>
              <li>Searchable Dropdown</li>
              <li>Auto Dial Code</li>
            </ul>
          </div>

          <div className="about-box">
            <h4>⚙️ Stack</h4>
            <ul>
              <li>React + Hooks</li>
              <li>Redux Toolkit</li>
              <li>React Router</li>
              <li>AG Grid</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;