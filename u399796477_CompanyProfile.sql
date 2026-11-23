-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 22, 2026 at 05:59 AM
-- Server version: 11.8.8-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u399796477_CompanyProfile`
--

-- --------------------------------------------------------

--
-- Table structure for table `Appointments`
--

CREATE TABLE `Appointments` (
  `AppointmentId` int(11) NOT NULL,
  `FullName` varchar(200) NOT NULL,
  `CompanyName` varchar(200) DEFAULT NULL,
  `Email` varchar(200) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Country` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `Service` varchar(150) NOT NULL,
  `PreferredDate` date NOT NULL,
  `PreferredTime` varchar(50) NOT NULL,
  `MeetingType` varchar(50) NOT NULL,
  `ProjectBudget` varchar(100) DEFAULT NULL,
  `ProjectTimeline` varchar(100) DEFAULT NULL,
  `ProjectDescription` text NOT NULL,
  `AttachmentUrl` varchar(500) DEFAULT NULL,
  `HeardAboutUs` varchar(100) DEFAULT NULL,
  `AgreePrivacy` tinyint(1) NOT NULL DEFAULT 0,
  `Status` varchar(50) NOT NULL DEFAULT 'New',
  `CreatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Appointments`
--

INSERT INTO `Appointments` (`AppointmentId`, `FullName`, `CompanyName`, `Email`, `Phone`, `Country`, `City`, `Service`, `PreferredDate`, `PreferredTime`, `MeetingType`, `ProjectBudget`, `ProjectTimeline`, `ProjectDescription`, `AttachmentUrl`, `HeardAboutUs`, `AgreePrivacy`, `Status`, `CreatedAt`) VALUES
(1, 'RAHEEL NOOR', 'PWO ', 'nraheel34@gmail.com', '+923000627224', 'Pakistan', 'Lahore', 'Website Development', '2026-07-25', '10:00 AM', 'Google Meet', 'Let\'s Discuss', 'Within 1 Month', 'its E-Commerance business site .', '/uploads/appt-1784697795406-180901242.png', 'Google', 1, 'New', '2026-07-22 05:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `Awards`
--

CREATE TABLE `Awards` (
  `AwardId` int(11) NOT NULL,
  `Title` varchar(250) NOT NULL,
  `ImageUrl` varchar(500) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Awards`
--

INSERT INTO `Awards` (`AwardId`, `Title`, `ImageUrl`, `DisplayOrder`, `IsActive`) VALUES
(1, 'Top Software Development Company 2025', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80', 1, 1),
(2, 'ISO 27001 Certified', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80', 2, 1),
(3, 'Clutch Global Leader', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', 3, 1),
(4, 'Great Place to Work', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80', 4, 1),
(5, 'Top Software Development Company 2025', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80', 1, 1),
(6, 'ISO 27001 Certified', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80', 2, 1),
(7, 'Clutch Global Leader', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', 3, 1),
(8, 'Great Place to Work', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `CaseStudies`
--

CREATE TABLE `CaseStudies` (
  `CaseStudyId` int(11) NOT NULL,
  `Title` varchar(250) NOT NULL,
  `Slug` varchar(250) NOT NULL,
  `ClientName` varchar(200) DEFAULT NULL,
  `ShortDescription` varchar(600) DEFAULT NULL,
  `Problem` longtext DEFAULT NULL,
  `Solution` longtext DEFAULT NULL,
  `ResultSummary` longtext DEFAULT NULL,
  `ImageUrl` varchar(500) DEFAULT NULL,
  `PdfUrl` varchar(500) DEFAULT NULL,
  `MetaTitle` varchar(250) DEFAULT NULL,
  `MetaDescription` varchar(500) DEFAULT NULL,
  `IsFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CaseStudies`
--

INSERT INTO `CaseStudies` (`CaseStudyId`, `Title`, `Slug`, `ClientName`, `ShortDescription`, `Problem`, `Solution`, `ResultSummary`, `ImageUrl`, `PdfUrl`, `MetaTitle`, `MetaDescription`, `IsFeatured`, `IsActive`, `CreatedAt`) VALUES
(1, 'Logistics Rider Management Portal', 'logistics-rider-management-portal', 'TASA Logistics Pakistan', 'A complete rider, parcel and collection management dashboard.', 'The client was managing deliveries, riders and collections manually through Excel sheets and WhatsApp updates.', 'We developed a web-based dashboard with rider assignment, parcel tracking, collection status and reporting.', 'The client improved daily visibility, reduced manual follow-ups and gained real-time operational reporting.', '/uploads/1784029821077-524067662.jpg', '/pdf/tasa-logistics.pdf', 'Logistics Rider Management Portal', 'Case study for logistics software in Pakistan.', 1, 1, '2026-07-02 20:20:06'),
(2, 'Clinic Website & Appointment System', 'clinic-website-appointment-system', 'Ensound Hearing Centre', 'A modern healthcare website with appointment inquiry flow.', 'The clinic needed a professional online presence and a simple way to collect patient inquiries.', 'We designed a responsive website with service pages, appointment form, contact details and SEO-ready content.', 'The clinic received a more professional brand image and better patient inquiry handling.', '/uploads/1784029916113-737942801.png', '/pdf/ensound.pdf', 'Clinic Website Development', 'Healthcare website case study.', 1, 1, '2026-07-02 20:20:06'),
(3, 'Corporate Company Profile Website', 'corporate-company-profile-website', 'Bright Engine Valves', 'A premium website for an automotive parts business.', 'The client wanted a modern online profile to present products and business credibility.', 'We created a fast corporate website with product sections, company overview and inquiry forms.', 'The business became ready to share its profile with customers, vendors and partners.', '/uploads/1784030143382-309628112.png', '/pdf/bright-engine.pdf', 'Company Profile Website', 'Corporate website case study Pakistan.', 0, 1, '2026-07-02 20:20:06'),
(4, 'NGO Awareness Website', 'ngo-awareness-website', 'People Welfare Organization', 'A clean website for welfare activities and public awareness.', 'The organization needed a platform to present its welfare work, mission and community impact.', 'We prepared a professional website structure with homepage banners, about section, services and contact forms.', 'The NGO became ready for online awareness and donor-facing presentation.', '/uploads/1784029972183-159664808.jpg', '/pdf/pwo.pdf', 'NGO Website Pakistan', 'NGO website case study.', 1, 1, '2026-07-02 20:20:06'),
(5, ' AI Automation (Real Estate for high rise buildings and Apartments)', 'automating-lead-response-real-estate-agency', 'Leading Real Estate Agency, DHA Lahore', 'How an automated WhatsApp lead-response system helped a real estate agency respond to inquiries instantly instead of hours later.', 'The agency was generating consistent property inquiries through Facebook and Instagram ads, but leads were being followed up manually — often 3 to 6 hours after the initial message. By the time an agent responded, many prospects had already inquired with a competitor or lost interest entirely. The team had no way to track which leads were contacted, follow-up was inconsistent, and there was no system to filter serious buyers from casual browsers.', 'We built an AI-powered WhatsApp automation system that instantly responds to every incoming inquiry, asks qualifying questions (budget, location preference, timeline), and routes serious leads directly to the sales team with full context already gathered. A lightweight CRM dashboard was integrated to track every lead\'s status in real time, along with automated follow-up reminders for leads that go quiet.', 'Response time dropped from hours to under 60 seconds. Lead qualification became automatic, allowing agents to focus only on serious buyers. The agency reported noticeably faster deal cycles and a clearer, more organized pipeline within the first month of use.', '/uploads/1784300242545-834631669.jpeg', '', '', '', 0, 1, '2026-07-17 14:57:33');

-- --------------------------------------------------------

--
-- Table structure for table `CaseStudyIndustries`
--

CREATE TABLE `CaseStudyIndustries` (
  `CaseStudyIndustryId` int(11) NOT NULL,
  `CaseStudyId` int(11) NOT NULL,
  `IndustryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CaseStudyIndustries`
--

INSERT INTO `CaseStudyIndustries` (`CaseStudyIndustryId`, `CaseStudyId`, `IndustryId`) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 3),
(4, 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `CaseStudyServices`
--

CREATE TABLE `CaseStudyServices` (
  `CaseStudyServiceId` int(11) NOT NULL,
  `CaseStudyId` int(11) NOT NULL,
  `ServiceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CaseStudyServices`
--

INSERT INTO `CaseStudyServices` (`CaseStudyServiceId`, `CaseStudyId`, `ServiceId`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 5),
(4, 2, 2),
(5, 2, 4),
(6, 3, 2),
(7, 3, 4),
(8, 4, 2),
(9, 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `ContactMessages`
--

CREATE TABLE `ContactMessages` (
  `ContactMessageId` int(11) NOT NULL,
  `FullName` varchar(150) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `CompanyName` varchar(200) DEFAULT NULL,
  `CompanyUrl` varchar(500) DEFAULT NULL,
  `Region` varchar(150) DEFAULT NULL,
  `IsJobSeeker` varchar(10) DEFAULT 'No',
  `ServiceInterest` varchar(200) DEFAULT NULL,
  `Message` longtext NOT NULL,
  `Status` varchar(50) NOT NULL DEFAULT 'New',
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ContactMessages`
--

INSERT INTO `ContactMessages` (`ContactMessageId`, `FullName`, `Email`, `Phone`, `CompanyName`, `CompanyUrl`, `Region`, `IsJobSeeker`, `ServiceInterest`, `Message`, `Status`, `CreatedAt`) VALUES
(1, 'Ali Hassan', 'ali.hassan@pakmail.com', '03004567890', 'Hassan Traders', NULL, NULL, 'No', 'Web Application Development', 'We need a company website with product inquiry form.', 'New', '2026-07-02 20:20:06'),
(2, 'Fatima Noor', 'fatima.noor@business.pk', '03114567890', 'Noor Clinic', NULL, NULL, 'No', 'Mobile App Development', 'We are looking for appointment booking app for our clinic.', 'New', '2026-07-02 20:20:06'),
(3, 'Kamran Shah', 'kamran@shahlogistics.pk', '03224567890', 'Shah Logistics', NULL, NULL, 'No', 'Custom Software Development', 'We need delivery and rider management software.', 'New', '2026-07-02 20:20:06'),
(4, 'test Raheel', 'admin@raheel.com', '03234732656', '', NULL, NULL, 'No', 'Web Development', 'i am doing testing ', 'New', '2026-07-03 05:16:43'),
(5, 'Test Raheel', 'nraheel34@gmail.com', '+924354398989', 'SyncSquad', NULL, NULL, 'No', 'Cloud & DevOps', 'i am doing Testing', 'New', '2026-07-21 18:37:55'),
(6, 'RAHEEL NOOR', 'nraheel34@gmail.com', '', '', NULL, NULL, 'No', 'Cloud & DevOps', 'hgghjgjhgjh jhgjhgjhgj gjhgjgh', 'New', '2026-07-21 18:40:10'),
(7, 'Testt Raheel', 'nraheel34@gmail.com', '+9243543998', 'Brite Engine', NULL, NULL, 'No', 'Digital Transformation Consulting', 'I am doing Testing ', 'New', '2026-07-21 18:48:19'),
(8, 'Test Raheel', 'nraheel34@gmail.com', '+923234732656', 'Brite Engine', NULL, NULL, 'No', 'AI Powerd Mobile Apps', 'i want to create mobile application for businees , i need your help , Thank you ', 'New', '2026-07-22 04:35:49');

-- --------------------------------------------------------

--
-- Table structure for table `FeaturedLogos`
--

CREATE TABLE `FeaturedLogos` (
  `FeaturedLogoId` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `ImageUrl` varchar(500) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `FeaturedLogos`
--

INSERT INTO `FeaturedLogos` (`FeaturedLogoId`, `Name`, `ImageUrl`, `DisplayOrder`, `IsActive`) VALUES
(1, 'Alkhan', '/uploads/1784698195181-669836564.jpg', 1, 1),
(2, 'indrive', '/uploads/1783497898118-486351925.png', 2, 1),
(3, 'sadi ki saji', '/uploads/1783497942289-97146657.png', 3, 1),
(4, 'Pak wheel', '/uploads/1783497984258-56907019.png', 4, 1),
(5, 'shaukat khanim', '/uploads/1783498024430-321866049.jpg', 5, 1),
(6, 'talabat', '/uploads/1783497880225-803174148.png', 1, 1),
(7, 'doctor hospital', '/uploads/1783497920689-365367404.png', 2, 1),
(8, 'Superior University', '/uploads/1783497961107-732850909.jpg', 3, 1),
(9, 'depilex', '/uploads/1783498003087-253626223.png', 4, 1),
(10, 'HBL', '/uploads/1783498044825-51850691.png', 5, 1),
(11, 'park avaenue', '/uploads/1784698207129-595412508.png', 1, 1),
(12, 'Finca', '/uploads/1783498198444-111503100.jpg', 2, 1),
(13, 'Ripah', '/uploads/1783498232809-869341146.png', 3, 1),
(14, 'Bahria University', '/uploads/1783498253385-754246236.png', 2, 1),
(15, 'umt', '/uploads/1783498277326-735161858.jpg', 4, 1),
(16, 'concordia College', '/uploads/1783498295554-40514167.jpg', 2, 1),
(17, 'Chughtai Lab', '/uploads/1783498330948-695058588.png', 4, 1),
(18, 'Al jalil Garden', '/uploads/1783498351047-509864595.png', 3, 1),
(19, 'suzuki', '/uploads/1783498382664-816061483.png', 3, 1),
(20, 'ecs', '/uploads/1783498402164-32374543.png', 2, 1),
(21, 'comsat university ', '/uploads/1784698222346-446542055.PNG', 2, 1),
(22, 'new news', '/uploads/1783498456529-942765555.jpg', 2, 1),
(23, 'Aspire College', '/uploads/1783498475317-911187446.png', 1, 1),
(24, 'cheezious', '/uploads/1783498498720-299005071.jpg', 1, 1),
(25, 'NAB', '/uploads/1783498516310-18890575.png', 1, 1),
(26, '7 News', '/uploads/1783498538036-429664987.jpg', 2, 1),
(27, 'Apex college', '/uploads/1783498567941-6510068.jpg', 1, 1),
(28, 'Park view', '/uploads/1783498809335-68199216.jpg', 3, 1),
(29, 'PCB', '/uploads/1783498825569-625630223.png', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Industries`
--

CREATE TABLE `Industries` (
  `IndustryId` int(11) NOT NULL,
  `Title` varchar(200) NOT NULL,
  `Slug` varchar(200) NOT NULL,
  `ShortDescription` varchar(500) DEFAULT NULL,
  `Description` longtext DEFAULT NULL,
  `ImageUrl` varchar(500) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Industries`
--

INSERT INTO `Industries` (`IndustryId`, `Title`, `Slug`, `ShortDescription`, `Description`, `ImageUrl`, `DisplayOrder`, `IsActive`, `CreatedAt`) VALUES
(1, 'Healthcare', 'healthcare', 'Smart systems for clinics and hospitals — from patient booking to follow-ups — built to reduce no-shows and free up staff time.', 'Healthcare providers lose time and revenue to missed appointments, manual scheduling, and disconnected patient communication. We build automation and digital systems designed specifically for clinics, hospitals, and healthcare providers — automated appointment booking and reminders, AI-powered patient inquiry handling, digital front-desk systems, and websites that make it effortless for patients to find and choose your practice. The result: fewer no-shows, less administrative burden on your staff, and a more professional patient experience from the very first interaction.', '/uploads/1783683101948-751159648.jpeg', 1, 1, '2026-07-02 20:20:06'),
(2, 'Quick Service Restaurant & Food Service Industory', 'logistics-delivery', ' Order, delivery, and customer systems built for speed — helping QSRs and food businesses serve faster and lose fewer orders to delay or error.', '\nIn quick service and food delivery, speed and accuracy directly determine customer retention. We build automated ordering systems, WhatsApp/AI-powered order handling, delivery tracking integrations, and digital menus designed to reduce wait times and eliminate order errors. Whether it\'s a single restaurant managing peak-hour rush or a multi-location food business needing centralized order and delivery coordination, our systems are built to keep every order accurate, every customer informed, and every location running smoothly — without adding manual workload to your team.', '/uploads/1783683436849-537285324.jpeg', 2, 1, '2026-07-02 20:20:06'),
(3, 'Retail & E-commerce', 'retail-ecommerce', 'Online stores and retail systems engineered to convert browsers into buyers — built for both digital-first and in-store retail businesses.', 'Retail and e-commerce businesses compete on experience as much as price. We build fast, conversion-optimized online stores, inventory and order management systems, AI-powered customer support, and marketing systems that bring in the right shoppers — not just traffic. For businesses running both physical and online retail, we also build integrated systems that keep inventory, sales, and customer data in sync across every channel, so nothing gets lost between the store counter and the shopping cart.', '/uploads/1783683890523-393010108.jpeg', 3, 1, '2026-07-02 20:20:06'),
(4, 'Education', 'education', 'Digital systems and websites for schools, academies, and training institutes — built to attract students and simplify enrollment and communication.', 'Education providers — from academies to training institutes — need more than a basic website to compete for students in a crowded market. We build professional websites, automated enrollment and inquiry systems, parent/student communication tools, and marketing campaigns designed to build trust and drive enrollment. Whether you\'re running an online academy, a physical institute, or a hybrid model, our systems handle the administrative load of inquiries, follow-ups, and communication — so your team can focus on teaching, not paperwork.', '/uploads/1783683646840-496152288.jpeg', 4, 1, '2026-07-02 20:20:06'),
(5, 'Real Estate & Construction', 'real-estate-construction', 'Lead capture and follow-up systems built for real estate and construction — turning inquiries into site visits and site visits into closed deals.', 'Real estate and construction businesses generate leads constantly — the challenge is following up fast enough before they go cold. We build automated lead capture and qualification systems, WhatsApp/AI-powered follow-up assistants, property listing websites, and CRM integrations designed specifically for agencies and developers. Every inquiry gets an instant response, every lead gets tracked, and your sales team spends time closing deals instead of chasing spreadsheets and missed calls.', '/uploads/1783683752732-625025170.jpeg', 5, 1, '2026-07-02 20:20:06');

-- --------------------------------------------------------

--
-- Table structure for table `JobApplications`
--

CREATE TABLE `JobApplications` (
  `JobApplicationId` int(11) NOT NULL,
  `JobId` int(11) NOT NULL,
  `FullName` varchar(150) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `LinkedInUrl` varchar(500) DEFAULT NULL,
  `PortfolioUrl` varchar(500) DEFAULT NULL,
  `ResumeUrl` varchar(500) DEFAULT NULL,
  `CoverLetter` longtext DEFAULT NULL,
  `ApplicationStatus` varchar(50) NOT NULL DEFAULT 'Pending',
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `JobApplications`
--

INSERT INTO `JobApplications` (`JobApplicationId`, `JobId`, `FullName`, `Email`, `Phone`, `LinkedInUrl`, `PortfolioUrl`, `ResumeUrl`, `CoverLetter`, `ApplicationStatus`, `CreatedAt`) VALUES
(1, 1, 'Usman Tariq', 'usman.tariq@email.com', '03001234567', 'https://linkedin.com/in/usmantariq', 'https://portfolio.com/usman', '/resumes/usman.pdf', 'I have frontend development experience and would like to join your team.', 'Pending', '2026-07-02 20:20:06'),
(2, 2, 'Maham Raza', 'maham.raza@email.com', '03211234567', 'https://linkedin.com/in/mahamraza', 'https://github.com/maham', '/resumes/maham.pdf', 'I have backend API and database experience.', 'Pending', '2026-07-02 20:20:06'),
(3, 3, 'Hassan Ali', 'hassan.ali@email.com', '03331234567', 'https://linkedin.com/in/hassanali', 'https://behance.net/hassan', '/resumes/hassan.pdf', 'I am interested in UI UX design role.', 'Pending', '2026-07-02 20:20:06');

-- --------------------------------------------------------

--
-- Table structure for table `Jobs`
--

CREATE TABLE `Jobs` (
  `JobId` int(11) NOT NULL,
  `Title` varchar(200) NOT NULL,
  `Slug` varchar(200) NOT NULL,
  `Department` varchar(150) DEFAULT NULL,
  `Location` varchar(200) DEFAULT NULL,
  `JobType` varchar(100) DEFAULT NULL,
  `ExperienceLevel` varchar(100) DEFAULT NULL,
  `Description` longtext DEFAULT NULL,
  `Requirements` longtext DEFAULT NULL,
  `Responsibilities` longtext DEFAULT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Jobs`
--

INSERT INTO `Jobs` (`JobId`, `Title`, `Slug`, `Department`, `Location`, `JobType`, `ExperienceLevel`, `Description`, `Requirements`, `Responsibilities`, `IsActive`, `CreatedAt`) VALUES
(1, 'Frontend Developer', 'frontend-developer', 'Engineering', 'Lahore, Pakistan', 'Full Time', '2+ Years', 'We are looking for a skilled frontend developer to build modern web interfaces.', 'React, JavaScript, HTML, CSS, responsive design and API integration experience required.', 'Develop UI screens, integrate APIs, fix bugs and work with backend team.', 1, '2026-07-02 20:20:06'),
(2, 'Backend Developer', 'backend-developer', 'Engineering', 'Karachi, Pakistan', 'Full Time', '3+ Years', 'We need a backend developer for APIs, databases and business logic.', '.NET Core or Node.js, SQL/MySQL, authentication and REST API experience required.', 'Create APIs, manage database queries, improve performance and deploy backend services.', 1, '2026-07-02 20:20:06'),
(3, 'UI UX Designer', 'ui-ux-designer', 'Design', 'Remote / Pakistan', 'Part Time', '2+ Years', 'Creative designer required for websites, dashboards and mobile app interfaces.', 'Figma, wireframes, design systems, typography and modern layout understanding required.', 'Create website designs, app screens, prototypes and design assets.', 1, '2026-07-02 20:20:06');

-- --------------------------------------------------------

--
-- Table structure for table `Offices`
--

CREATE TABLE `Offices` (
  `OfficeId` int(11) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `City` varchar(100) NOT NULL,
  `OfficeTitle` varchar(200) DEFAULT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `Email` varchar(150) DEFAULT NULL,
  `Latitude` decimal(10,7) DEFAULT NULL,
  `Longitude` decimal(10,7) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Offices`
--

INSERT INTO `Offices` (`OfficeId`, `Country`, `City`, `OfficeTitle`, `Address`, `Phone`, `Email`, `Latitude`, `Longitude`, `DisplayOrder`, `IsActive`) VALUES
(1, 'Pakistan', 'Lahore', 'Central Office ', '55 Commercial, Sector A DHA Phase 6, Lahore, Pakistan', '', 'hello@theewotech.com', 31.5204000, 74.3587000, 1, 1),
(5, 'United State of America', 'New York', 'United States Head Office ', '200 W, 54 St, State New York, NY 10001,United states, New York, NY, United States, US 10001 Address', '', 'Global@theewotech.com', 0.0000000, 0.0000000, 0, 1),
(7, 'United Arab Emirates', 'Dubai', 'Regional Office ', '1 9th St - Al Satwa - Dubai - United Arab Emirates - Dubai - United Arab Emirates', '', 'Global@theewotech.com', 0.0000000, 0.0000000, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Pages`
--

CREATE TABLE `Pages` (
  `PageId` int(11) NOT NULL,
  `PageName` varchar(150) NOT NULL,
  `Slug` varchar(150) NOT NULL,
  `MetaTitle` varchar(250) DEFAULT NULL,
  `MetaDescription` varchar(500) DEFAULT NULL,
  `Content` longtext DEFAULT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Pages`
--

INSERT INTO `Pages` (`PageId`, `PageName`, `Slug`, `MetaTitle`, `MetaDescription`, `Content`, `IsActive`, `CreatedAt`) VALUES
(1, 'Home', 'home', 'Professional Software Company Pakistan', 'Custom software, web and mobile app development company in Pakistan.', 'Welcome to our company. We build modern digital solutions for businesses in Pakistan and overseas.', 1, '2026-07-02 20:20:06'),
(2, 'About Us', 'about-us', 'About Our Company', 'Learn about our mission, team and technology expertise.', 'We are a Pakistan-based software company focused on quality, reliability and long-term client success.', 1, '2026-07-02 20:20:06'),
(3, 'Services', 'services', 'Our Services', 'Explore our software development and digital transformation services.', 'We provide web development, mobile app development, UI UX design, cloud deployment and consulting.', 1, '2026-07-02 20:20:06'),
(4, 'Careers', 'careers', 'Careers', 'Join our growing technology team in Pakistan.', 'We are always looking for talented developers, designers and project managers.', 1, '2026-07-02 20:20:06'),
(5, 'Contact', 'contact', 'Contact Us', 'Contact our team for your next digital project.', 'Get in touch with us for consultation, quotation or project discussion.', 1, '2026-07-02 20:20:06');

-- --------------------------------------------------------

--
-- Table structure for table `Partnerships`
--

CREATE TABLE `Partnerships` (
  `PartnershipId` int(11) NOT NULL,
  `Name` varchar(250) NOT NULL,
  `ImageUrl` varchar(500) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Partnerships`
--

INSERT INTO `Partnerships` (`PartnershipId`, `Name`, `ImageUrl`, `DisplayOrder`, `IsActive`) VALUES
(1, 'Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/200px-Microsoft_logo_%282012%29.svg.png', 1, 1),
(2, 'AWS', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png', 2, 1),
(3, 'Google Cloud', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/200px-Google_Cloud_logo.svg.png', 3, 1),
(4, 'Shopify', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/200px-Shopify_logo_2018.svg.png', 4, 1),
(5, 'Salesforce', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/200px-Salesforce.com_logo.svg.png', 5, 1),
(6, 'Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/200px-Microsoft_logo_%282012%29.svg.png', 1, 1),
(7, 'AWS', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png', 2, 1),
(8, 'Google Cloud', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/200px-Google_Cloud_logo.svg.png', 3, 1),
(9, 'Shopify', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/200px-Shopify_logo_2018.svg.png', 4, 1),
(10, 'Salesforce', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/200px-Salesforce.com_logo.svg.png', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(100) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`RoleId`, `RoleName`, `CreatedAt`) VALUES
(1, 'Admin', '2026-07-02 20:20:06'),
(2, 'Content Manager', '2026-07-02 20:20:06'),
(3, 'HR Manager', '2026-07-02 20:20:06'),
(4, 'Editor', '2026-07-03 04:31:55');

-- --------------------------------------------------------

--
-- Table structure for table `Services`
--

CREATE TABLE `Services` (
  `ServiceId` int(11) NOT NULL,
  `Title` varchar(200) NOT NULL,
  `Slug` varchar(200) NOT NULL,
  `ShortDescription` varchar(500) DEFAULT NULL,
  `Description` longtext DEFAULT NULL,
  `Icon` varchar(250) DEFAULT NULL,
  `ImageUrl` varchar(500) DEFAULT NULL,
  `MetaTitle` varchar(250) DEFAULT NULL,
  `MetaDescription` varchar(500) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT 0,
  `IsFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Services`
--

INSERT INTO `Services` (`ServiceId`, `Title`, `Slug`, `ShortDescription`, `Description`, `Icon`, `ImageUrl`, `MetaTitle`, `MetaDescription`, `DisplayOrder`, `IsFeatured`, `IsActive`, `CreatedAt`) VALUES
(1, 'Custom Software Development', 'custom-software-development', 'Software built around how your business actually works — not a template forcing you to adapt.', 'Off-the-shelf tools are built for everyone, which means they\'re optimized for no one. We build custom software shaped precisely around your operations, your workflows, and your growth plans. Whether it\'s an internal management system, a client portal, or a full-scale platform, our development process is built on clean architecture, scalable code, and long-term maintainability — not quick fixes that break under pressure. We work as an extension of your team, translating real operational needs into software that actually gets used, not shelved after launch.\n\n**What\'s included:** Full-stack application development · Internal tools & management systems · API integrations · Legacy system modernization · Scalable, maintainable architecture\n', 'code', '/uploads/1783680277300-710444807.jpeg', 'Custom Software Development Pakistan', 'Professional software development services in Pakistan.', 1, 0, 1, '2026-07-02 20:20:06'),
(2, 'AI Powerd Websites', 'web-application-development', 'Websites that don\'t just present your business — they actively work to convert visitors into customers.', 'Your website should be your hardest-working employee — available 24/7, never off-message, and constantly optimizing. We build AI-powered websites that go beyond static design: smart chat assistants that answer visitor questions instantly, personalized content that adapts to user behavior, and conversion-focused layouts built on data, not guesswork. Every site we build is fast, mobile-first, and search-engine ready from day one. This isn\'t a digital brochure — it\'s a sales tool that works while you focus on running your business.\n**What\'s included:** AI chat assistant integration · Conversion-optimized design · Mobile-first, responsive builds · SEO-ready architecture · CMS integration for easy updates · Speed & performance optimization', 'globe', '/uploads/1783680296729-896093872.jpeg', 'Web Development Pakistan', 'Modern web application development services.', 2, 0, 1, '2026-07-02 20:20:06'),
(3, 'AI Powerd Mobile Apps', 'mobile-app-development', 'Native and cross-platform mobile apps enhanced with intelligent features that keep users engaged and coming back.', 'A great app isn\'t just functional — it\'s intelligent. We build mobile applications for iOS and Android that integrate AI-driven features like smart recommendations, automated customer support, and predictive personalization, all wrapped in clean, intuitive design. From concept to App Store launch, we handle the complete development lifecycle — architecture, UI/UX, backend integration, and ongoing performance monitoring. Whether you\'re building a customer-facing app or an internal operations tool, we design for the experience your users actually want, not just the features on a spec sheet.\n\n**What\'s included:** iOS & Android development · AI-powered personalization & recommendations · In-app chat/support automation · Backend & API integration · App Store deployment & support\n', 'mobile', '/uploads/1783680355592-176953255.jpeg', 'Mobile App Development Pakistan', 'Professional mobile app development services.', 3, 0, 1, '2026-07-02 20:20:06'),
(4, 'UI UX Design', 'ui-ux-design', 'Design that doesn\'t just look premium — it guides users exactly where you want them to go.', 'Good design is invisible; it just works. We design user interfaces and experiences grounded in real user behavior — not just current design trends. Every screen, every flow, every button placement is intentional, built to reduce friction and guide users toward the action that matters, whether that\'s a purchase, a sign-up, or a booking. Our design process starts with understanding your users, not just your brand aesthetic, so the final product isn\'t just beautiful — it converts, retains, and builds trust from the first interaction.\n\n**What\'s included:** User research & journey mapping · Wireframing & prototyping · Visual & interaction design · Design systems & style guides · Usability testing & iteration', 'palette', '/uploads/1783680372865-732091957.jpeg', 'UI UX Design Pakistan', 'Premium UI UX design services.', 4, 1, 1, '2026-07-02 20:20:06'),
(5, 'Cloud & DevOps', 'cloud-devops', 'Reliable, scalable infrastructure so your applications stay fast, secure, and online — no matter how much you grow.', 'Behind every great application is infrastructure that never gets noticed — because it never fails. We design and manage cloud architecture and DevOps pipelines that scale with your business, from initial deployment to handling sudden traffic surges without a hitch. Our approach focuses on automation, security, and cost-efficiency: continuous integration and deployment pipelines that ship updates safely, monitoring systems that catch issues before your users do, and cloud architecture built to scale without ballooning your costs.\n\nWhat\'s included: Cloud infrastructure setup (AWS/Azure/GCP) · CI/CD pipeline implementation · Server & database management · Security hardening & monitoring · Cost optimization & scaling strategy', 'cloud', '/uploads/1783680396298-639056708.jpeg', 'Cloud DevOps Pakistan', 'Cloud deployment and DevOps services.', 5, 0, 1, '2026-07-02 20:20:06'),
(6, 'Digital Transformation Consulting', 'digital-transformation-consulting', 'A clear, practical roadmap to modernize your operations — built around your business, not generic best practices.', 'Digital transformation isn\'t about adopting every new technology — it\'s about knowing which ones actually move your business forward. We work directly with founders and leadership teams to audit current operations, identify where outdated processes are costing time and money, and build a phased, realistic roadmap for modernization. This isn\'t a slide deck full of buzzwords — it\'s a practical plan with clear priorities, timelines, and measurable outcomes, backed by a team that can actually execute every recommendation we make.\n\n**What\'s included:** Operations & tech stack audit · Digital roadmap & prioritization · Process automation strategy · Technology selection guidance · Implementation support & execution\n', 'strategy', '/uploads/1783680474065-980670677.jpeg', 'Digital Transformation Pakistan', 'Business technology consulting services.', 6, 0, 1, '2026-07-02 20:20:06'),
(7, 'AI & Automation', 'AI-Automation', 'Intelligent systems that run your operations, follow up your leads, and eliminate manual work — automatically.', 'This is where we started, and it\'s still where we\'re strongest. We design AI-powered automation systems that connect your CRM, WhatsApp, email, and internal tools into one seamless flow — so leads get followed up instantly, data gets logged without manual entry, and your team spends time on decisions, not data entry. From intelligent chatbots that qualify leads while you sleep, to internal workflow automations that eliminate repetitive tasks entirely, we build systems that pay for themselves in reclaimed hours. This isn\'t automation for the sake of technology — it\'s automation built around what\'s actually slowing your business down.\n\nWhat\'s included: Workflow automation (n8n & custom) · WhatsApp/Email AI assistants · Lead capture & auto-qualification · Chatbot development · Internal reporting dashboards · CRM & tool integrations\n', 'Globe', '/uploads/1783680179724-143215688.jpeg', NULL, NULL, 0, 0, 1, '2026-07-06 09:12:45'),
(8, 'E-Commerce Solutions', 'E-Commerce-Solutions', 'End-to-end online stores engineered to convert — from product page to checkout, built for speed, trust, and sales.', 'We build e-commerce platforms that do more than display products — they sell them. Every store we design is built around conversion psychology: fast load times, frictionless checkout, mobile-first layouts, and trust signals placed exactly where buyers hesitate. Whether you\'re launching your first online store or rebuilding one that isn\'t performing, we handle the full stack — storefront design, payment gateway integration, inventory systems, and post-launch optimization. Our goal isn\'t just a store that looks good. It\'s a store that turns visitors into repeat customers.\n\nWhat\'s included: Custom storefront design · Payment gateway integration (local & international) · Inventory & order management · Mobile-optimized checkout · Speed & SEO optimization · Post-launch support', 'Globe', '/uploads/1783680200498-129012073.jpeg', NULL, NULL, 0, 0, 1, '2026-07-10 06:59:33'),
(9, 'Marketing Solutions', 'Marketing-Solutions', 'Strategy-first marketing that brings in customers ready to buy — not just clicks that bounce.', '\nMarketing without strategy is just spending. We build marketing systems designed around one metric that matters: return on investment. From brand positioning and content strategy to paid campaigns on Meta and Google, every piece of work is built to move your ideal customer from \"just browsing\" to \"ready to buy.\" We don\'t chase vanity metrics like impressions and likes — we track leads, conversions, and revenue. Whether you need a complete marketing overhaul or a focused campaign to fill your pipeline, we build it with the same discipline we bring to engineering.\n\nWhat\'s included: Brand strategy & positioning · Paid ad campaigns (Meta, Google) · Content creation & social media management · SEO fundamentals · Performance tracking & reporting', 'Globe', '/uploads/1783680227052-412114551.jpeg', NULL, NULL, 0, 0, 1, '2026-07-10 07:00:48');

-- --------------------------------------------------------

--
-- Table structure for table `SiteSettings`
--

CREATE TABLE `SiteSettings` (
  `SiteSettingId` int(11) NOT NULL,
  `SettingKey` varchar(150) NOT NULL,
  `SettingValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `SiteSettings`
--

INSERT INTO `SiteSettings` (`SiteSettingId`, `SettingKey`, `SettingValue`) VALUES
(1, 'SiteName', 'EWO TECHNOLOGIES PVT LTD'),
(2, 'Tagline', 'Powered by AI.'),
(3, 'PrimaryEmail', 'hello@theewotech.com'),
(4, 'PrimaryPhone', '+44 36286972 2'),
(5, 'Address', ''),
(6, 'FacebookUrl', 'https://facebook.com/company'),
(7, 'LinkedInUrl', 'https://linkedin.com/company/company'),
(8, 'WhatsAppNumber', '+44 6826972 2'),
(9, 'hero_badge', 'Enterprise Software & AI Engineering — Delivered Globally'),
(10, 'hero_title', 'Powered by AI.'),
(11, 'hero_subtitle', 'We partner with organizations across North America, the Middle East, Africa, and Asia-Pacific — delivering enterprise-grade product engineering, scalable cloud platforms, and intelligent automation built for real business impact.'),
(12, 'hero_video_url', 'https://cdn.coverr.co/videos/coverr-abstract-digital-network-connections-4640/1080p.mp4'),
(13, 'stat_1_value', '173+'),
(14, 'stat_1_label', 'Delivered Projects'),
(15, 'stat_2_value', '27+'),
(16, 'stat_2_label', 'Countries Served'),
(17, 'stat_3_value', '94+'),
(18, 'stat_3_label', 'Active Clients'),
(19, 'stat_4_value', '13+'),
(20, 'stat_4_label', 'Years of Proven Excellence'),
(21, 'careers_title', 'People First. Always.'),
(22, 'careers_subtitle', 'Join a global team where excellence, diversity, and belonging aren\'t values on a wall — they\'re how we work every day.');

-- --------------------------------------------------------

--
-- Table structure for table `TeamMembers`
--

CREATE TABLE `TeamMembers` (
  `TeamMemberId` int(11) NOT NULL,
  `FullName` varchar(150) NOT NULL,
  `Designation` varchar(150) DEFAULT NULL,
  `Bio` longtext DEFAULT NULL,
  `ImageUrl` varchar(500) DEFAULT NULL,
  `LinkedInUrl` varchar(500) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `TeamMembers`
--

INSERT INTO `TeamMembers` (`TeamMemberId`, `FullName`, `Designation`, `Bio`, `ImageUrl`, `LinkedInUrl`, `DisplayOrder`, `IsActive`) VALUES
(1, 'Faizan Ahmad', 'Founder & CEO', 'Experienced technology consultant helping Pakistani businesses build scalable digital products.', '/uploads/1783347103963-683830317.PNG', 'https://linkedin.com/in/hamzamalik', 1, 1),
(2, 'Ayesha Khan', 'Project Manager', 'Manages software projects, client communication and delivery timelines.', '/images/team/ayesha.jpg', 'https://linkedin.com/in/ayeshakhan', 2, 1),
(3, 'Raheel Noor', 'Senior Software Engineer', 'Specialist in backend APIs, databases and enterprise application development.', '/uploads/1783347152848-356124918.jpeg', 'https://linkedin.com/in/bilalahmed', 3, 1),
(4, 'Sana Javed', 'UI UX Designer', 'Creates clean, modern and user-friendly interfaces for web and mobile apps.', '/uploads/1783347165039-530651027.jpg', 'https://linkedin.com/in/sanajaved', 4, 1),
(5, 'Danish Iqbal', 'DevOps Engineer', 'Handles cloud deployment, Docker, VPS configuration and server optimization.', '/uploads/1783347179827-305963227.jpg', 'https://linkedin.com/in/danishiqbal', 5, 1),
(6, 'Mariam Sheikh', 'Business Development Manager', 'Builds client relationships and helps businesses understand technology solutions.', '/images/team/mariam.jpg', 'https://linkedin.com/in/mariamsheikh', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Technologies`
--

CREATE TABLE `Technologies` (
  `TechnologyId` int(11) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `IconUrl` varchar(500) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT 0,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Technologies`
--

INSERT INTO `Technologies` (`TechnologyId`, `Name`, `Category`, `IconUrl`, `DisplayOrder`, `IsActive`) VALUES
(1, 'React', 'Frontend', NULL, 1, 1),
(2, 'Next.js', 'Frontend', NULL, 2, 1),
(3, 'TypeScript', 'Frontend', NULL, 3, 1),
(4, 'Tailwind CSS', 'Frontend', NULL, 4, 1),
(5, 'Vue.js', 'Frontend', NULL, 5, 1),
(6, 'Angular', 'Frontend', NULL, 6, 1),
(7, 'Node.js', 'Server Side', NULL, 7, 1),
(8, 'Express', 'Server Side', NULL, 8, 1),
(9, 'Python', 'Server Side', NULL, 9, 1),
(10, '.NET', 'Server Side', NULL, 10, 1),
(11, 'MySQL', 'Databases', NULL, 11, 1),
(12, 'PostgreSQL', 'Databases', NULL, 12, 1),
(13, 'MongoDB', 'Databases', NULL, 13, 1),
(14, 'Redis', 'Databases', NULL, 14, 1),
(15, 'Docker', 'DevSecOps', NULL, 15, 1),
(16, 'Kubernetes', 'DevSecOps', NULL, 16, 1),
(17, 'AWS', 'DevSecOps', NULL, 17, 1),
(18, 'Azure', 'DevSecOps', NULL, 18, 1),
(19, 'TensorFlow', 'Libraries', NULL, 19, 1),
(20, 'OpenAI', 'Libraries', NULL, 20, 1),
(21, 'GraphQL', 'Libraries', NULL, 21, 1),
(22, 'React', 'Frontend', NULL, 1, 1),
(23, 'Next.js', 'Frontend', NULL, 2, 1),
(24, 'TypeScript', 'Frontend', NULL, 3, 1),
(25, 'Tailwind CSS', 'Frontend', NULL, 4, 1),
(26, 'Vue.js', 'Frontend', NULL, 5, 1),
(27, 'Angular', 'Frontend', NULL, 6, 1),
(28, 'Node.js', 'Server Side', NULL, 7, 1),
(29, 'Express', 'Server Side', NULL, 8, 1),
(30, 'Python', 'Server Side', NULL, 9, 1),
(31, '.NET', 'Server Side', NULL, 10, 1),
(32, 'MySQL', 'Databases', NULL, 11, 1),
(33, 'PostgreSQL', 'Databases', NULL, 12, 1),
(34, 'MongoDB', 'Databases', NULL, 13, 1),
(35, 'Redis', 'Databases', NULL, 14, 1),
(36, 'Docker', 'DevSecOps', NULL, 15, 1),
(37, 'Kubernetes', 'DevSecOps', NULL, 16, 1),
(38, 'AWS', 'DevSecOps', NULL, 17, 1),
(39, 'Azure', 'DevSecOps', NULL, 18, 1),
(40, 'TensorFlow', 'Libraries', NULL, 19, 1),
(41, 'OpenAI', 'Libraries', NULL, 20, 1),
(42, 'GraphQL', 'Libraries', NULL, 21, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Testimonials`
--

CREATE TABLE `Testimonials` (
  `TestimonialId` int(11) NOT NULL,
  `ClientName` varchar(150) NOT NULL,
  `ClientDesignation` varchar(150) DEFAULT NULL,
  `CompanyName` varchar(150) DEFAULT NULL,
  `Message` longtext NOT NULL,
  `ImageUrl` varchar(500) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Testimonials`
--

INSERT INTO `Testimonials` (`TestimonialId`, `ClientName`, `ClientDesignation`, `CompanyName`, `Message`, `ImageUrl`, `Rating`, `IsActive`, `CreatedAt`) VALUES
(1, 'Nadeem Malik', 'Operations Manager', 'TASA Logistics Pakistan', 'The dashboard helped us manage riders, deliveries and collections in a much better way. The team understood our requirements clearly.', '/uploads/1784029561367-859193173.png', 5, 1, '2026-07-02 20:20:06'),
(2, 'Dr. Faisal Khan', 'Director', 'Ensound Hearing Centre', 'Our clinic website now looks professional and patients can easily contact us online.', '/images/testimonials/faisal.jpg', 5, 1, '2026-07-02 20:20:06'),
(3, 'Noman Siddiqui', 'CEO', 'Bright Engine Valves', 'The company profile website gave our business a strong digital identity.', '/images/testimonials/noman.jpg', 5, 1, '2026-07-02 20:20:06'),
(4, 'Sara Mahmood', 'Marketing Head', 'Urban Retail PK', 'Their design quality and development speed were excellent for our ecommerce project.', '/images/testimonials/sara.jpg', 4, 1, '2026-07-02 20:20:06');

-- --------------------------------------------------------

--
-- Table structure for table `UserRoles`
--

CREATE TABLE `UserRoles` (
  `UserRoleId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `UserRoles`
--

INSERT INTO `UserRoles` (`UserRoleId`, `UserId`, `RoleId`) VALUES
(2, 2, 2),
(3, 3, 3),
(4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserId` int(11) NOT NULL,
  `FullName` varchar(150) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `PasswordHash` text NOT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserId`, `FullName`, `Email`, `PasswordHash`, `IsActive`, `CreatedAt`) VALUES
(1, 'Hamza Malik', 'admin@theewotech.pk', '$2b$12$jIS6s7a.AgpvgeQKUhqR5uMtiDANjs.DXePRkTmGRADx6AT0NgwiO', 1, '2026-07-02 20:20:06'),
(2, 'Ayesha Khan', 'ayesha.khan@syncsquad.pk', 'demo123', 1, '2026-07-02 20:20:06'),
(3, 'Bilal Ahmed', 'bilal.ahmed@syncsquad.pk', 'demo123', 1, '2026-07-02 20:20:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Appointments`
--
ALTER TABLE `Appointments`
  ADD PRIMARY KEY (`AppointmentId`);

--
-- Indexes for table `Awards`
--
ALTER TABLE `Awards`
  ADD PRIMARY KEY (`AwardId`);

--
-- Indexes for table `CaseStudies`
--
ALTER TABLE `CaseStudies`
  ADD PRIMARY KEY (`CaseStudyId`),
  ADD UNIQUE KEY `Slug` (`Slug`);

--
-- Indexes for table `CaseStudyIndustries`
--
ALTER TABLE `CaseStudyIndustries`
  ADD PRIMARY KEY (`CaseStudyIndustryId`),
  ADD KEY `CaseStudyId` (`CaseStudyId`),
  ADD KEY `IndustryId` (`IndustryId`);

--
-- Indexes for table `CaseStudyServices`
--
ALTER TABLE `CaseStudyServices`
  ADD PRIMARY KEY (`CaseStudyServiceId`),
  ADD KEY `CaseStudyId` (`CaseStudyId`),
  ADD KEY `ServiceId` (`ServiceId`);

--
-- Indexes for table `ContactMessages`
--
ALTER TABLE `ContactMessages`
  ADD PRIMARY KEY (`ContactMessageId`);

--
-- Indexes for table `FeaturedLogos`
--
ALTER TABLE `FeaturedLogos`
  ADD PRIMARY KEY (`FeaturedLogoId`);

--
-- Indexes for table `Industries`
--
ALTER TABLE `Industries`
  ADD PRIMARY KEY (`IndustryId`),
  ADD UNIQUE KEY `Slug` (`Slug`);

--
-- Indexes for table `JobApplications`
--
ALTER TABLE `JobApplications`
  ADD PRIMARY KEY (`JobApplicationId`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `Jobs`
--
ALTER TABLE `Jobs`
  ADD PRIMARY KEY (`JobId`),
  ADD UNIQUE KEY `Slug` (`Slug`);

--
-- Indexes for table `Offices`
--
ALTER TABLE `Offices`
  ADD PRIMARY KEY (`OfficeId`);

--
-- Indexes for table `Pages`
--
ALTER TABLE `Pages`
  ADD PRIMARY KEY (`PageId`),
  ADD UNIQUE KEY `Slug` (`Slug`);

--
-- Indexes for table `Partnerships`
--
ALTER TABLE `Partnerships`
  ADD PRIMARY KEY (`PartnershipId`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`RoleId`),
  ADD UNIQUE KEY `RoleName` (`RoleName`);

--
-- Indexes for table `Services`
--
ALTER TABLE `Services`
  ADD PRIMARY KEY (`ServiceId`),
  ADD UNIQUE KEY `Slug` (`Slug`);

--
-- Indexes for table `SiteSettings`
--
ALTER TABLE `SiteSettings`
  ADD PRIMARY KEY (`SiteSettingId`),
  ADD UNIQUE KEY `SettingKey` (`SettingKey`);

--
-- Indexes for table `TeamMembers`
--
ALTER TABLE `TeamMembers`
  ADD PRIMARY KEY (`TeamMemberId`);

--
-- Indexes for table `Technologies`
--
ALTER TABLE `Technologies`
  ADD PRIMARY KEY (`TechnologyId`);

--
-- Indexes for table `Testimonials`
--
ALTER TABLE `Testimonials`
  ADD PRIMARY KEY (`TestimonialId`);

--
-- Indexes for table `UserRoles`
--
ALTER TABLE `UserRoles`
  ADD PRIMARY KEY (`UserRoleId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `RoleId` (`RoleId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Appointments`
--
ALTER TABLE `Appointments`
  MODIFY `AppointmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Awards`
--
ALTER TABLE `Awards`
  MODIFY `AwardId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `CaseStudies`
--
ALTER TABLE `CaseStudies`
  MODIFY `CaseStudyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `CaseStudyIndustries`
--
ALTER TABLE `CaseStudyIndustries`
  MODIFY `CaseStudyIndustryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `CaseStudyServices`
--
ALTER TABLE `CaseStudyServices`
  MODIFY `CaseStudyServiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ContactMessages`
--
ALTER TABLE `ContactMessages`
  MODIFY `ContactMessageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `FeaturedLogos`
--
ALTER TABLE `FeaturedLogos`
  MODIFY `FeaturedLogoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `Industries`
--
ALTER TABLE `Industries`
  MODIFY `IndustryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `JobApplications`
--
ALTER TABLE `JobApplications`
  MODIFY `JobApplicationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Jobs`
--
ALTER TABLE `Jobs`
  MODIFY `JobId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Offices`
--
ALTER TABLE `Offices`
  MODIFY `OfficeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `PageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Partnerships`
--
ALTER TABLE `Partnerships`
  MODIFY `PartnershipId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `RoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Services`
--
ALTER TABLE `Services`
  MODIFY `ServiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `SiteSettings`
--
ALTER TABLE `SiteSettings`
  MODIFY `SiteSettingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `TeamMembers`
--
ALTER TABLE `TeamMembers`
  MODIFY `TeamMemberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Technologies`
--
ALTER TABLE `Technologies`
  MODIFY `TechnologyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `Testimonials`
--
ALTER TABLE `Testimonials`
  MODIFY `TestimonialId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `UserRoles`
--
ALTER TABLE `UserRoles`
  MODIFY `UserRoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CaseStudyIndustries`
--
ALTER TABLE `CaseStudyIndustries`
  ADD CONSTRAINT `CaseStudyIndustries_ibfk_1` FOREIGN KEY (`CaseStudyId`) REFERENCES `CaseStudies` (`CaseStudyId`),
  ADD CONSTRAINT `CaseStudyIndustries_ibfk_2` FOREIGN KEY (`IndustryId`) REFERENCES `Industries` (`IndustryId`);

--
-- Constraints for table `CaseStudyServices`
--
ALTER TABLE `CaseStudyServices`
  ADD CONSTRAINT `CaseStudyServices_ibfk_1` FOREIGN KEY (`CaseStudyId`) REFERENCES `CaseStudies` (`CaseStudyId`),
  ADD CONSTRAINT `CaseStudyServices_ibfk_2` FOREIGN KEY (`ServiceId`) REFERENCES `Services` (`ServiceId`);

--
-- Constraints for table `JobApplications`
--
ALTER TABLE `JobApplications`
  ADD CONSTRAINT `JobApplications_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `Jobs` (`JobId`);

--
-- Constraints for table `UserRoles`
--
ALTER TABLE `UserRoles`
  ADD CONSTRAINT `UserRoles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`),
  ADD CONSTRAINT `UserRoles_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`RoleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
