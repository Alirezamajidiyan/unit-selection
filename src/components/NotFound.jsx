import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="not-found-container text-center">
      <h1 className="display-1 text-danger">404</h1>
      <p className="lead">پیدا نشد کیومرث</p>
      <Link to="/" className="btn btn-primary">
        بازگشت
      </Link>
    </div>
  );
};

export default NotFound;
