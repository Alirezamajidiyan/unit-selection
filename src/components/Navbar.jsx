import { Link } from "react-router-dom";

function Navbar({ totalUnits, toggleTheme, siteTheme }) {
  return (
    <nav
      className={`navbar navbar-expand-lg ${
        siteTheme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
      } border-bottom border-3 rounded-2 mb-3`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          برنامه انتخاب واحد
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex justify-content-between align-items-center w-100">
            <span
              className={`nav-link p-2 badge mx-2 ${
                siteTheme === "light"
                  ? "bg-dark text-light"
                  : "bg-light text-dark"
              }`}
            >
              تعداد واحد انتخاب شده: {totalUnits}
            </span>

            <div className="d-flex align-items-center gap-3">
              <button
                className={`btn ${
                  siteTheme === "light" ? "btn-dark" : "btn-light"
                }`}
                onClick={toggleTheme}
              >
                {siteTheme === "light" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              <Link
                className={`btn ${
                  siteTheme === "light" ? "btn-primary" : "btn-secondary"
                }`}
                to="/unit-selection/about"
              >
                درباره ما
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
