import { useState } from "react";
import "./Export.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

function Export() {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [filters, setFilters] = useState({
    locations: [],
    categories: [],
    optionals: [],
  });
  const [formats, setFormats] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });

  const toggleCheckbox = (group, value) => {
    setFilters((prev) => {
      const current = prev[group];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [group]: next };
    });
  };

  const toggleFormat = (value) => {
    setFormats((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const parseJSON = async (response) => {
    const text = await response.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "pending", message: "Preparing export..." });

    try {
      const response = await fetch(`${API_BASE_URL}/api/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateRange, filters, format: formats }),
      });

      const data = await parseJSON(response);
      if (!response.ok) {
        throw new Error(data.message || "Unable to export data.");
      }

      setStatus({ type: "success", message: "Export request submitted." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div>
      <div className="hero-section">
        <div className="image"></div>

        <form className="text" onSubmit={handleSubmit}>
          <div className="title">Export</div>
          <div className="info">Choose what data to include in your export</div>

          <div className="date">
            <p className="category-title">Date Range:</p>
            <div className="dates-container">
              <div className="input-container">
                <div className="input-label">Start Date:</div>
                <div className="input-box">
                  <input
                    type="date"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={(e) =>
                      setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="input-container">
                <div className="input-label">End Date:</div>
                <div className="input-box">
                  <input
                    type="date"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={(e) =>
                      setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="location-category-optional">
            <div className="location category-title">
              <p>Location:</p>
              <div className="options">
                {[
                  { value: "country", label: "Country" },
                  { value: "region", label: "Region" },
                  { value: "province", label: "Province" },
                ].map((option) => (
                  <label className="opt" key={option.value}>
                    <input
                      className="input-exp"
                      type="checkbox"
                      checked={filters.locations.includes(option.value)}
                      onChange={() => toggleCheckbox("locations", option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="separator"></div>

            <div className="category category-title">
              <p>Category/Data Type:</p>
              <div className="options">
                {[
                  { value: "bacteria", label: "Bacteria Type" },
                  { value: "amr", label: "Antibiotic resistance type" },
                  { value: "case", label: "Case status" },
                ].map((option) => (
                  <label className="opt" key={option.value}>
                    <input
                      className="input-exp"
                      type="checkbox"
                      checked={filters.categories.includes(option.value)}
                      onChange={() => toggleCheckbox("categories", option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="separator"></div>

            <div className="optional category-title">
              <p>Optional Filters:</p>
              <div className="options">
                {[
                  { value: "ageGroup", label: "Age group" },
                  { value: "severity", label: "Severity" },
                  { value: "source", label: "Source (hospital, lab, etc.)" },
                ].map((option) => (
                  <label className="opt" key={option.value}>
                    <input
                      className="input-exp"
                      type="checkbox"
                      checked={filters.optionals.includes(option.value)}
                      onChange={() => toggleCheckbox("optionals", option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="export">
            <p className="category-title">Export Format & Options:</p>
            <div className="options">
              {[
                { value: "pdf", label: "PDF" },
                { value: "png", label: "PNG" },
                { value: "excel", label: "Excel (.xlsx)" },
              ].map((option) => (
                <label className="opt" key={option.value}>
                  <input
                    className="input-exp"
                    type="checkbox"
                    checked={formats.includes(option.value)}
                    onChange={() => toggleFormat(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {status.message && (
            <div className={`form-status ${status.type}`}>{status.message}</div>
          )}

          <button className="export-submit-btn" type="submit">
            <span>EXPORT DATA</span>
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Export;
