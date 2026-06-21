import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="contents">
        <div className="left">Faculty of natural and agricultural sciences</div>
        <div className="right">
          <NavLink to="/admin-login" className={({ isActive }) => (isActive ? "active" : "")}>
            <button className="admin-btn">
              <span>ADMIN LOGIN</span>
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#cdeff2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="16"
                  height="16"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-4 12-4 12 0" />
                </svg>
              </div>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Footer;
