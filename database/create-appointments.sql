-- ================================================================
-- EWO Technologies — Appointments table
-- Run once in phpMyAdmin > SQL (does NOT run on redeploy)
-- ================================================================

CREATE TABLE IF NOT EXISTS Appointments (
  AppointmentId INT AUTO_INCREMENT PRIMARY KEY,
  FullName VARCHAR(200) NOT NULL,
  CompanyName VARCHAR(200) NULL,
  Email VARCHAR(200) NOT NULL,
  Phone VARCHAR(50) NOT NULL,
  Country VARCHAR(100) NULL,
  City VARCHAR(100) NULL,
  Service VARCHAR(150) NOT NULL,
  PreferredDate DATE NOT NULL,
  PreferredTime VARCHAR(50) NOT NULL,
  MeetingType VARCHAR(50) NOT NULL,
  ProjectBudget VARCHAR(100) NULL,
  ProjectTimeline VARCHAR(100) NULL,
  ProjectDescription TEXT NOT NULL,
  AttachmentUrl VARCHAR(500) NULL,
  HeardAboutUs VARCHAR(100) NULL,
  AgreePrivacy TINYINT(1) NOT NULL DEFAULT 0,
  Status VARCHAR(50) NOT NULL DEFAULT 'New',
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
