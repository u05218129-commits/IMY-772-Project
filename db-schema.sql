-- MySQL table schema for reports
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reporter_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  organisation VARCHAR(255),
  case_description TEXT,
  case_title VARCHAR(255),
  bacteria_type VARCHAR(255),
  resistance_type VARCHAR(255),
  location VARCHAR(255),
  case_date DATE,
  documents TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
