import { useState } from "react";
import "./Report.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

function Report() {
  const [values, setValues] = useState({
    reporterName: "",
    email: "",
    organisation: "",
    caseDescription: "",
    caseTitle: "",
    bacteriaType: "",
    resistanceType: "",
    location: "",
    caseDate: "",
    documents: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
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
    setStatus({ type: "pending", message: "Submitting report..." });

    try {
      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await parseJSON(response);

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit report.");
      }

      setStatus({ type: "success", message: "Report submitted successfully." });
      setValues({
        reporterName: "",
        email: "",
        organisation: "",
        caseDescription: "",
        caseTitle: "",
        bacteriaType: "",
        resistanceType: "",
        location: "",
        caseDate: "",
        documents: "",
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div>
      <div className="hero-section hero-report">
        <div className="text">
          <div className="title">Submit Report</div>
          <div className="info">
            Report a new AMR case or submit data suggestions.
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="row-one">
            <div className="personal-details">
              <div className="title">Personal Details</div>
              <div className="inputs">
                <div className="input-container">
                  <div className="input-label">Reporter name:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="reporterName"
                      value={values.reporterName}
                      onChange={handleChange}
                      placeholder="John"
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="input-label">Email:</div>
                  <div className="input-box">
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="input-label">Organisation:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="organisation"
                      value={values.organisation}
                      onChange={handleChange}
                      placeholder="University of Pretoria"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="case-details">
              <div className="title">Case Details</div>
              <div className="inputs">
                <div className="input-container">
                  <div className="input-label">Case Description:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="caseDescription"
                      value={values.caseDescription}
                      onChange={handleChange}
                      placeholder="Brief case description"
                    />
                  </div>
                </div>
              </div>

              <div className="inputs">
                <div className="input-container">
                  <div className="input-label">Case Title:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="caseTitle"
                      value={values.caseTitle}
                      onChange={handleChange}
                      placeholder="Case title"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row-two">
            <div className="case-details">
              <div className="title">AMR Details</div>
              <div className="inputs">
                <div className="input-container">
                  <div className="input-label">Bacteria Type:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="bacteriaType"
                      value={values.bacteriaType}
                      onChange={handleChange}
                      placeholder="E.g. E. coli"
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="input-label">Antibiotic Resistance Type:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="resistanceType"
                      value={values.resistanceType}
                      onChange={handleChange}
                      placeholder="E.g. Carbapenem-resistant"
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="input-label">Location:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      placeholder="Location"
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="input-label">Date of Case:</div>
                  <div className="input-box">
                    <input
                      type="date"
                      name="caseDate"
                      value={values.caseDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="file-upload">
              <div className="title">File Upload</div>
              <div className="inputs">
                <div className="input-container">
                  <div className="input-label">Documents:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="documents"
                      value={values.documents}
                      onChange={handleChange}
                      placeholder="Document links or notes"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {status.message && (
            <div className={`form-status ${status.type}`}>{status.message}</div>
          )}

          <button className="report-submit-btn" type="submit">
            <span>SUBMIT REPORT</span>
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
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Report;
