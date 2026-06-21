import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AdminRoute, ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Help from "./pages/Help";
import Report from "./pages/Report";
import Export from "./pages/Export";
import AdminDashboard from "./pages/AdminDashboard";
import ResearcherDashboard from "./pages/ResearcherDashboard";
import Analytics from "./pages/Analytics";
import DataManagement from "./pages/DataManagement";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/help" element={<Help />} />
            <Route path="/report" element={<Report />} />
            <Route path="/export" element={<Export />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Routes */}
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<AdminRoute><AdminDashboard /></AdminRoute>}
            />
            <Route
              path="/admin/data-management"
              element={<AdminRoute><DataManagement /></AdminRoute>}
            />

            {/* Researcher Routes */}
            <Route
              path="/researcher"
              element={<ProtectedRoute requiredRole="researcher"><ResearcherDashboard /></ProtectedRoute>}
            />

            {/* Catch-all */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;