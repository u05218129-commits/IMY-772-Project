const express = require("express");
const cors = require("cors");
const { pool } = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1 AS status");
    res.json({ status: "ok", db: result.rows[0] });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.post("/api/reports", async (req, res) => {
  const {
    reporterName,
    email,
    organisation,
    caseDescription,
    caseTitle,
    bacteriaType,
    resistanceType,
    location,
    caseDate,
    documents,
  } = req.body;

  try {
    const query = `INSERT INTO reports
      (reporter_name, email, organisation, case_description, case_title,
       bacteria_type, resistance_type, location, case_date, documents, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING id`;

    const result = await pool.query(query, [
      reporterName,
      email,
      organisation,
      caseDescription,
      caseTitle,
      bacteriaType,
      resistanceType,
      location,
      caseDate,
      documents,
    ]);

    res.status(201).json({
      success: true,
      insertId: result.rows[0]?.id ?? null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/export", async (req, res) => {
  const { dateRange, filters, format } = req.body;
  res.json({
    success: true,
    message: "Export request received",
    export: { dateRange, filters, format },
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
