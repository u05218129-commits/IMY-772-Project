import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import navImg from "../assets/images/UP_Logo.png";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, user, logout, isAdmin, isResearcher } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="name">
        <div className="name-and-logo">
          <img src={navImg} alt="Nav" />
          Faculty of Natural and agricultural sciences
        </div>
      </div>

      <div className="links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>
        <NavLink to="/help" className={({ isActive }) => isActive ? "active" : ""}>
          Help
        </NavLink>
        <NavLink to="/report" className={({ isActive }) => isActive ? "active" : ""}>
          Report
        </NavLink>
        <NavLink to="/export" className={({ isActive }) => isActive ? "active" : ""}>
          Export
        </NavLink>

        {/* Protected navigation */}
        {isAuthenticated && (
          <>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? "active" : ""}>
              📊 Analytics
            </NavLink>

            {isResearcher && (
              <NavLink to="/researcher" className={({ isActive }) => isActive ? "active" : ""}>
                🔬 Research
              </NavLink>
            )}

            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
                ⚙️ Admin
              </NavLink>
            )}
          </>
        )}
      </div>

      <div className="navbar-right">
        {isAuthenticated ? (
          <div className="user-section">
            <span className="user-email">{user?.email}</span>
            <span className={`user-role role-${user?.role || 'casual'}`}>
              {user?.role?.toUpperCase()}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;