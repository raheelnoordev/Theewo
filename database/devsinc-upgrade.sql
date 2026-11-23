-- ================================================================
-- EWO Technologies — Devsinc-style UI upgrade
-- Run in phpMyAdmin > SQL (safe to run once)
-- ================================================================

-- New tables
CREATE TABLE IF NOT EXISTS FeaturedLogos (
  FeaturedLogoId INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(200) NOT NULL,
  ImageUrl VARCHAR(500),
  DisplayOrder INT NOT NULL DEFAULT 0,
  IsActive BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Awards (
  AwardId INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(250) NOT NULL,
  ImageUrl VARCHAR(500),
  DisplayOrder INT NOT NULL DEFAULT 0,
  IsActive BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Partnerships (
  PartnershipId INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(250) NOT NULL,
  ImageUrl VARCHAR(500),
  DisplayOrder INT NOT NULL DEFAULT 0,
  IsActive BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Technologies (
  TechnologyId INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(150) NOT NULL,
  Category VARCHAR(100) NOT NULL,
  IconUrl VARCHAR(500),
  DisplayOrder INT NOT NULL DEFAULT 0,
  IsActive BOOLEAN NOT NULL DEFAULT 1
);

-- Contact form extra fields (Devsinc-style)
ALTER TABLE ContactMessages
  ADD COLUMN IF NOT EXISTS CompanyUrl VARCHAR(500) NULL AFTER CompanyName,
  ADD COLUMN IF NOT EXISTS Region VARCHAR(150) NULL AFTER CompanyUrl,
  ADD COLUMN IF NOT EXISTS IsJobSeeker VARCHAR(10) NULL DEFAULT 'No' AFTER Region;

-- Note: IF NOT EXISTS on ADD COLUMN works on MySQL 8.0+
-- If error, run these one by one and skip if column exists:
-- ALTER TABLE ContactMessages ADD COLUMN CompanyUrl VARCHAR(500) NULL;
-- ALTER TABLE ContactMessages ADD COLUMN Region VARCHAR(150) NULL;
-- ALTER TABLE ContactMessages ADD COLUMN IsJobSeeker VARCHAR(10) NULL DEFAULT 'No';

-- Site settings for hero video & Devsinc-style copy
INSERT INTO SiteSettings (SettingKey, SettingValue) VALUES
('hero_badge', 'Enterprise Software & AI Engineering'),
('hero_title', 'Building at the Speed of AI'),
('hero_subtitle', 'We help companies across North America, Middle East, Africa and Asia Pacific with world-class product engineering, cloud platforms, and intelligent automation.'),
('hero_video_url', 'https://cdn.coverr.co/videos/coverr-abstract-digital-network-connections-4640/1080p.mp4'),
('stat_1_value', '150+'),
('stat_1_label', 'Successful Projects'),
('stat_2_value', '12+'),
('stat_2_label', 'Countries Supported'),
('stat_3_value', '80+'),
('stat_3_label', 'Active Clients'),
('stat_4_value', '10+'),
('stat_4_label', 'Years of Experience'),
('careers_title', 'Human-first is our foundation.'),
('careers_subtitle', 'Join a culture that celebrates excellence and diversity, globally.')
ON DUPLICATE KEY UPDATE SettingValue = VALUES(SettingValue);

-- Featured In logos
INSERT INTO FeaturedLogos (Name, ImageUrl, DisplayOrder, IsActive) VALUES
('Forbes', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Forbes_logo.svg/320px-Forbes_logo.svg.png', 1, 1),
('TechCrunch', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/320px-TechCrunch_logo.svg.png', 2, 1),
('Clutch', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Clutch_logo.svg/320px-Clutch_logo.svg.png', 3, 1),
('Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/320px-Microsoft_logo_%282012%29.svg.png', 4, 1),
('AWS', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png', 5, 1)
ON DUPLICATE KEY UPDATE Name = VALUES(Name);

-- Awards
INSERT INTO Awards (Title, ImageUrl, DisplayOrder, IsActive) VALUES
('Top Software Development Company 2025', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80', 1, 1),
('ISO 27001 Certified', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80', 2, 1),
('Clutch Global Leader', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', 3, 1),
('Great Place to Work', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80', 4, 1);

-- Partnerships
INSERT INTO Partnerships (Name, ImageUrl, DisplayOrder, IsActive) VALUES
('Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/200px-Microsoft_logo_%282012%29.svg.png', 1, 1),
('AWS', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png', 2, 1),
('Google Cloud', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/200px-Google_Cloud_logo.svg.png', 3, 1),
('Shopify', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/200px-Shopify_logo_2018.svg.png', 4, 1),
('Salesforce', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/200px-Salesforce.com_logo.svg.png', 5, 1);

-- Tech stack
INSERT INTO Technologies (Name, Category, DisplayOrder, IsActive) VALUES
('React', 'Frontend', 1, 1), ('Next.js', 'Frontend', 2, 1), ('TypeScript', 'Frontend', 3, 1), ('Tailwind CSS', 'Frontend', 4, 1),
('Vue.js', 'Frontend', 5, 1), ('Angular', 'Frontend', 6, 1),
('Node.js', 'Server Side', 7, 1), ('Express', 'Server Side', 8, 1), ('Python', 'Server Side', 9, 1), ('.NET', 'Server Side', 10, 1),
('MySQL', 'Databases', 11, 1), ('PostgreSQL', 'Databases', 12, 1), ('MongoDB', 'Databases', 13, 1), ('Redis', 'Databases', 14, 1),
('Docker', 'DevSecOps', 15, 1), ('Kubernetes', 'DevSecOps', 16, 1), ('AWS', 'DevSecOps', 17, 1), ('Azure', 'DevSecOps', 18, 1),
('TensorFlow', 'Libraries', 19, 1), ('OpenAI', 'Libraries', 20, 1), ('GraphQL', 'Libraries', 21, 1);
