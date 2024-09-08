
const AboutUs = ({theme}) => {
  const developers = [
    {
      name: "Developer One",
      role: "Front-end Developer",
      avatar: "https://via.placeholder.com/150",
      description: "Experienced in React, Bootstrap, and modern web technologies.",
    },
    {
      name: "Developer Two",
      role: "Back-end Developer",
      avatar: "https://via.placeholder.com/150",
      description: "Specialized in Node.js, databases, and API development.",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">About Us</h2>
      <div className="row">
        {developers.map((dev, index) => (
          <div key={index} className="col-md-6 text-center mb-4">
            <img
              src={dev.avatar}
              alt={`${dev.name} Avatar`}
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
            <h4>{dev.name}</h4>
            <p className="text-muted">{dev.role}</p>
            <p>{dev.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
