import React from "react";

const AboutUs = ({ theme }) => {
  const developers = [
    {
      name: "علیرضا مجیدیان",
      role: "Front-end Developer",
      github: "https://github.com/Alirezamajidiyan", 
      username: "Alirezamajidiyan", 
      description: "Experienced in React, Bootstrap, and modern web technologies.",
    },
    {
      name: "امیر نظری",
      role: "Back-end Developer",
      github: "https://github.com/nazamirari", 
      username: "nazamirari", 
      description: "Specialized in Node.js, databases, and API development.",
    },
  ];

  return (
    <div
      className={`container my-5 ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
      } p-4 rounded`}
    >
      <h2 className="text-center mb-4">درباره ما</h2>
      <div className="row">
        {developers.map((dev, index) => (
          <div key={index} className="col-md-6 text-center mb-4">
            {/* GitHub Avatar */}
            <img
              src={`https://github.com/${dev.username}.png`}
              alt={`${dev.name} Avatar`}
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
            <h4>{dev.name}</h4>
            <p className={`text-${theme === "dark" ? "light" : "muted"}`}>
              {dev.role}
            </p>
            <p>{dev.description}</p>
            {/* GitHub Icon with Link */}
            <a
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-${theme === "dark" ? "light" : "dark"} fs-3`}
            >
              <i class="bi bi-github"></i>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
