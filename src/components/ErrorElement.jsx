const Error = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Error: </strong> {message || "Something went wrong!"}
    </div>
  );
};

export default Error;
