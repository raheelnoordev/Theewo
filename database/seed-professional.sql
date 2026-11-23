-- ================================================================
-- EWO TECHNOLOGIES — PROFESSIONAL WEBSITE DATA
-- Database: u399796477_CompanyProfile
-- Run in phpMyAdmin > SQL tab (one full paste)
--
-- ADMIN LOGIN (required first):
--   Option A (recommended): cd backend && npm run seed
--   Option B: run database/create-admin.sql after generating hash
--
-- Default admin after seed:
--   Email: admin@ewotechnologies.com
--   Password: Admin@Ewo2026
--   URL: https://theewotech.com/admin/login
-- ================================================================

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM CaseStudyServices;
DELETE FROM CaseStudyIndustries;
DELETE FROM JobApplications;
DELETE FROM ContactMessages;
DELETE FROM CaseStudies;
DELETE FROM Jobs;
DELETE FROM Services;
DELETE FROM Industries;
DELETE FROM TeamMembers;
DELETE FROM Testimonials;
DELETE FROM Offices;
DELETE FROM Pages;
DELETE FROM SiteSettings;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------
-- SITE SETTINGS
-- ----------------------------------------------------------------
INSERT INTO SiteSettings (SettingKey, SettingValue) VALUES
('hero_badge', 'Trusted by Enterprise Teams Worldwide'),
('hero_title', 'We Engineer the Future of Enterprise Applications'),
('hero_subtitle', 'EWO Technologies partners with ambitious organizations to design, build, and scale secure digital products — from strategy and UX to cloud-native engineering and long-term platform support.'),
('stat_1_value', '12+'),
('stat_1_label', 'Delivery Practices'),
('stat_2_value', '150+'),
('stat_2_label', 'Projects Delivered'),
('stat_3_value', '99.9%'),
('stat_3_label', 'Production Uptime'),
('stat_4_value', '4.9/5'),
('stat_4_label', 'Client Satisfaction'),
('contact_email', 'info@ewotechnologies.com'),
('contact_phone', '+1 (214) 555-0199'),
('contact_address', '1200 Main Street, Suite 400, Dallas, TX 75202, United States');

-- ----------------------------------------------------------------
-- SERVICES
-- ----------------------------------------------------------------
INSERT INTO Services (Title, Slug, ShortDescription, Description, Icon, ImageUrl, MetaTitle, MetaDescription, DisplayOrder, IsFeatured, IsActive) VALUES
('Product Engineering', 'product-engineering', 'End-to-end product development for web and cloud platforms built to scale.', 'We help product leaders move from concept to production with cross-functional squads covering discovery, architecture, implementation, and release operations. Our teams specialize in React, Node.js, and API-first design for enterprise-grade reliability.', 'Cpu', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80', 'Product Engineering Services | EWO Technologies', 'Enterprise product engineering for modern software organizations.', 1, 1, 1),
('Web Application Development', 'web-application-development', 'Secure, high-performance web applications tailored to your business workflows.', 'From customer portals to internal operations platforms, we deliver responsive applications with role-based access, audit trails, and integrations to ERP, CRM, and payment systems.', 'Globe', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', 'Web Application Development', 'Custom web application development for enterprises.', 2, 1, 1),
('Mobile App Development', 'mobile-app-development', 'Native and cross-platform mobile experiences for iOS and Android.', 'We build mobile products with offline resilience, push notifications, biometric security, and seamless API connectivity — ideal for field teams, customer apps, and on-the-go workflows.', 'Smartphone', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80', 'Mobile App Development', 'Enterprise mobile application development.', 3, 1, 1),
('UI/UX & Product Design', 'ui-ux-product-design', 'Research-led design systems that improve adoption and reduce delivery risk.', 'Our designers facilitate workshops, map user journeys, and deliver scalable design systems that align stakeholders and accelerate engineering delivery.', 'Palette', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80', 'UI/UX Design Services', 'Product design and UX consulting for software teams.', 4, 1, 1),
('Cloud & DevOps', 'cloud-devops', 'Automated infrastructure, CI/CD, and observability for resilient releases.', 'We implement infrastructure as code, container orchestration, and monitoring stacks that help teams deploy confidently while meeting security and compliance requirements.', 'Cloud', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80', 'Cloud & DevOps Services', 'Cloud infrastructure and DevOps automation.', 5, 0, 1),
('AI & Intelligent Automation', 'ai-intelligent-automation', 'Practical AI features embedded into existing products with measurable ROI.', 'We design copilots, document intelligence, and workflow automation with guardrails, evaluation pipelines, and cost controls — so AI enhances your product without compromising trust.', 'Sparkles', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80', 'AI & Automation Solutions', 'Enterprise AI integration and automation.', 6, 1, 1),
('Quality Engineering', 'quality-engineering', 'Automated testing strategies that protect releases and reduce regression risk.', 'Our QA engineers implement test automation, performance testing, and release validation frameworks integrated into your CI/CD pipeline.', 'ShieldCheck', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80', 'Quality Engineering Services', 'Software testing and quality assurance.', 7, 0, 1),
('Dedicated Teams', 'dedicated-teams', 'Scale your delivery capacity with vetted engineers aligned to your timezone.', 'Extend your in-house team with dedicated developers, designers, and DevOps specialists who integrate into your tools, ceremonies, and quality standards.', 'Users', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80', 'Dedicated Development Teams', 'Staff augmentation and dedicated engineering squads.', 8, 0, 1);

-- ----------------------------------------------------------------
-- INDUSTRIES
-- ----------------------------------------------------------------
INSERT INTO Industries (Title, Slug, ShortDescription, Description, ImageUrl, DisplayOrder, IsActive) VALUES
('Healthcare & Life Sciences', 'healthcare-life-sciences', 'Compliant digital platforms for providers, payers, and health innovators.', 'We build HIPAA-aware patient portals, care coordination tools, and integration layers connecting EHR, lab, and billing systems with strong identity management and auditability.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80', 1, 1),
('Financial Services', 'financial-services', 'Secure fintech platforms for payments, lending, and digital banking.', 'From onboarding and KYC to transaction monitoring, we help regulated organizations ship faster while maintaining compliance, fraud resistance, and operational transparency.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', 2, 1),
('Retail & E-Commerce', 'retail-ecommerce', 'Omnichannel commerce experiences that increase conversion and retention.', 'We unify catalog, checkout, fulfillment, and customer support systems to help retailers scale across regions, marketplaces, and mobile channels.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80', 3, 1),
('Logistics & Supply Chain', 'logistics-supply-chain', 'Real-time visibility across fleet, warehouse, and partner networks.', 'Our platforms improve route planning, inventory accuracy, and SLA performance with event-driven architectures and executive dashboards.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80', 4, 1),
('Education & EdTech', 'education-edtech', 'Learning platforms and student experiences built for engagement at scale.', 'We deliver LMS features, progress analytics, and role-based access for institutions modernizing digital learning and administrative workflows.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80', 5, 1),
('Energy & Utilities', 'energy-utilities', 'Operational software for asset monitoring, field service, and customer engagement.', 'We support digital transformation initiatives with secure integrations, mobile workforce tools, and data platforms for operational decision-making.', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80', 6, 1);

-- ----------------------------------------------------------------
-- CASE STUDIES
-- ----------------------------------------------------------------
INSERT INTO CaseStudies (Title, Slug, ClientName, ShortDescription, Problem, Solution, ResultSummary, ImageUrl, MetaTitle, MetaDescription, IsFeatured, IsActive) VALUES
('Modernizing a National Patient Access Platform', 'modernizing-patient-access-platform', 'NorthBridge Health', 'Replaced a legacy portal with a secure, scalable platform serving 2.4M members.', 'Legacy architecture caused slow releases, poor mobile experience, and recurring downtime during enrollment periods.', 'EWO delivered a React and Node.js platform with zero-downtime migration, SSO integration, and observability across all critical user journeys.', 'Page load times improved 47%, release cadence increased 3x, and platform uptime reached 99.95% within the first year.', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80', 'Healthcare Portal Modernization Case Study', 'Enterprise healthcare digital platform transformation.', 1, 1),
('Automating Fintech Customer Onboarding', 'automating-fintech-onboarding', 'LedgerOne', 'Reduced manual KYC review effort by 62% with intelligent onboarding workflows.', 'Rapid growth overwhelmed compliance teams with manual document checks and inconsistent approval timelines.', 'We implemented rules-based verification, third-party identity integrations, and an operations dashboard with complete audit history.', 'Average onboarding time dropped from 36 hours to under 5 hours while improving first-pass compliance approval rates.', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80', 'Fintech Onboarding Automation', 'KYC and onboarding workflow automation.', 1, 1),
('Unified Commerce Order Hub for Multi-Brand Retailer', 'unified-commerce-order-hub', 'Meridian Retail Group', 'Centralized order management across ecommerce, stores, and marketplace channels.', 'Disconnected systems created inventory mismatches, delayed shipments, and rising customer support volume.', 'EWO built an event-driven order management hub connecting storefront, ERP, WMS, and carrier APIs with real-time status visibility.', 'Order accuracy improved to 99.3%, support tickets fell 34%, and fulfillment SLA adherence increased by 21%.', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80', 'Retail Order Management Case Study', 'Omnichannel retail order platform.', 1, 1),
('AI-Assisted Support for B2B SaaS Platform', 'ai-assisted-support-b2b-saas', 'CloudOps Suite', 'Embedded AI copilot reduced tier-1 support load while improving response quality.', 'Support teams struggled to scale with product complexity and repetitive technical inquiries.', 'We integrated a retrieval-augmented copilot with policy guardrails, human handoff, and analytics on resolution quality.', 'Median first-response time improved 58% and tier-1 ticket volume decreased 29% in the first quarter post-launch.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80', 'AI Support Copilot Case Study', 'Enterprise AI support automation.', 1, 1);

INSERT INTO CaseStudyServices (CaseStudyId, ServiceId)
SELECT cs.CaseStudyId, s.ServiceId FROM CaseStudies cs JOIN Services s ON
  (cs.Slug = 'modernizing-patient-access-platform' AND s.Slug IN ('product-engineering','web-application-development','cloud-devops')) OR
  (cs.Slug = 'automating-fintech-onboarding' AND s.Slug IN ('web-application-development','ai-intelligent-automation')) OR
  (cs.Slug = 'unified-commerce-order-hub' AND s.Slug IN ('product-engineering','mobile-app-development')) OR
  (cs.Slug = 'ai-assisted-support-b2b-saas' AND s.Slug IN ('ai-intelligent-automation','quality-engineering'));

INSERT INTO CaseStudyIndustries (CaseStudyId, IndustryId)
SELECT cs.CaseStudyId, i.IndustryId FROM CaseStudies cs JOIN Industries i ON
  (cs.Slug = 'modernizing-patient-access-platform' AND i.Slug = 'healthcare-life-sciences') OR
  (cs.Slug = 'automating-fintech-onboarding' AND i.Slug = 'financial-services') OR
  (cs.Slug = 'unified-commerce-order-hub' AND i.Slug = 'retail-ecommerce') OR
  (cs.Slug = 'ai-assisted-support-b2b-saas' AND i.Slug = 'education-edtech');

-- ----------------------------------------------------------------
-- JOBS
-- ----------------------------------------------------------------
INSERT INTO Jobs (Title, Slug, Department, Location, JobType, ExperienceLevel, Description, Requirements, Responsibilities, IsActive) VALUES
('Senior Full Stack Engineer', 'senior-full-stack-engineer', 'Engineering', 'Dallas, TX / Remote', 'Full-time', 'Senior', 'Lead delivery of enterprise web platforms for global clients in agile product squads.', '5+ years with React and Node.js; strong API design; MySQL/PostgreSQL; experience with cloud deployments and code reviews.', 'Own feature delivery end-to-end; mentor engineers; collaborate with product and design; uphold engineering standards.', 1),
('Lead UI/UX Designer', 'lead-ui-ux-designer', 'Design', 'Remote', 'Full-time', 'Senior', 'Shape product experiences and design systems for complex B2B software products.', '7+ years in product design; expert Figma skills; design systems experience; strong portfolio with enterprise workflows.', 'Lead discovery workshops; produce high-fidelity designs; maintain design system; partner with engineering on feasibility.', 1),
('DevOps Engineer', 'devops-engineer', 'Platform Engineering', 'Karachi / Remote', 'Full-time', 'Mid-level', 'Build reliable CI/CD pipelines and cloud infrastructure for client and internal platforms.', 'Docker, Kubernetes, Terraform; AWS or Azure; monitoring and incident response; Linux administration.', 'Automate deployments; improve observability; enforce security baselines; support production reliability.', 1),
('Technical Project Manager', 'technical-project-manager', 'Delivery', 'London / Remote', 'Full-time', 'Mid-level', 'Coordinate multi-disciplinary software delivery programs with executive-level visibility.', 'Agile delivery experience; strong stakeholder communication; technical background preferred; Jira/Confluence proficiency.', 'Plan releases; manage risks; facilitate ceremonies; report progress to client leadership.', 1);

-- ----------------------------------------------------------------
-- TEAM
-- ----------------------------------------------------------------
INSERT INTO TeamMembers (FullName, Designation, Bio, ImageUrl, LinkedInUrl, DisplayOrder, IsActive) VALUES
('Raheel Noor', 'Founder & Chief Executive Officer', 'Raheel founded EWO Technologies to help organizations translate ambitious product visions into dependable software platforms. He leads company strategy, key client partnerships, and delivery excellence across global teams.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80', 'https://www.linkedin.com', 1, 1),
('Sarah Mitchell', 'Chief Technology Officer', 'Sarah oversees solution architecture, engineering standards, and platform reliability. She has led large-scale modernization programs across healthcare and fintech.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', 'https://www.linkedin.com', 2, 1),
('James Carter', 'VP of Product Design', 'James brings deep expertise in enterprise UX, design systems, and customer research. He ensures every product we ship is intuitive, accessible, and aligned with business outcomes.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', 'https://www.linkedin.com', 3, 1),
('Aisha Khan', 'Director of Client Delivery', 'Aisha manages program governance, client communication, and cross-functional execution. Her teams consistently deliver on scope, timeline, and quality expectations.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80', 'https://www.linkedin.com', 4, 1),
('Daniel Ortiz', 'Head of Engineering Operations', 'Daniel optimizes engineering workflows, DevOps practices, and talent development across distributed delivery centers.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', 'https://www.linkedin.com', 5, 1);

-- ----------------------------------------------------------------
-- TESTIMONIALS
-- ----------------------------------------------------------------
INSERT INTO Testimonials (ClientName, ClientDesignation, CompanyName, Message, ImageUrl, Rating, IsActive) VALUES
('Michael Roberts', 'Chief Technology Officer', 'NorthBridge Health', 'EWO transformed our member portal with exceptional engineering discipline. Their team communicated clearly, met aggressive deadlines, and delivered a platform our clinicians and patients trust.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80', 5, 1),
('Emily Watson', 'VP of Product', 'LedgerOne', 'The onboarding automation program was a game changer. EWO understood compliance constraints and still moved fast — our operations team finally has visibility and control.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', 5, 1),
('David Chen', 'Director of Digital Operations', 'Meridian Retail Group', 'Our order management hub eliminated channel sync issues and gave leadership real-time insight. Support volume dropped within weeks of go-live.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', 5, 1),
('Priya Nair', 'Head of Customer Success', 'CloudOps Suite', 'The AI support initiative was implemented responsibly with clear guardrails and measurable KPIs. Our customers get faster answers and our team focuses on complex cases.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', 5, 1);

-- ----------------------------------------------------------------
-- OFFICES
-- ----------------------------------------------------------------
INSERT INTO Offices (Country, City, OfficeTitle, Address, Phone, Email, Latitude, Longitude, DisplayOrder, IsActive) VALUES
('United States', 'Dallas', 'Americas Headquarters', '1200 Main Street, Suite 400, Dallas, TX 75202', '+1 (214) 555-0199', 'info@ewotechnologies.com', 32.7767000, -96.7970000, 1, 1),
('United Kingdom', 'London', 'EMEA Business Office', '25 Canada Square, Canary Wharf, London E14 5LQ', '+44 20 7946 0958', 'europe@ewotechnologies.com', 51.5054000, -0.0235000, 2, 1),
('Saudi Arabia', 'Riyadh', 'Middle East Client Hub', 'King Fahd Road, Olaya District, Riyadh', '+966 11 234 5678', 'mena@ewotechnologies.com', 24.7136000, 46.6753000, 3, 1),
('Pakistan', 'Karachi', 'Global Delivery Center', 'Clifton Block 5, Karachi', '+92 21 3456 7890', 'delivery@ewotechnologies.com', 24.8138000, 67.0299000, 4, 1);

-- ----------------------------------------------------------------
-- CMS PAGES (Resources)
-- ----------------------------------------------------------------
INSERT INTO Pages (PageName, Slug, MetaTitle, MetaDescription, Content, IsActive) VALUES
('The Enterprise Guide to Cloud-Native Architecture', 'enterprise-guide-cloud-native-architecture', 'Cloud-Native Architecture Guide', 'How modern enterprises adopt cloud-native patterns for resilience and speed.', 'Cloud-native architecture enables teams to deploy independently, recover quickly from failure, and scale services based on real demand.\n\nAt EWO Technologies, we help organizations evaluate readiness, define target architectures, and implement container platforms with observability, security, and cost governance built in from day one.', 1),
('API Security Patterns for Modern Products', 'api-security-patterns-modern-products', 'API Security Best Practices', 'Practical API security guidance for product and engineering leaders.', 'Secure APIs require layered controls: authentication, authorization, input validation, rate limiting, encryption, and audit logging.\n\nWe implement OAuth2/JWT standards, role-based access models, and automated security testing pipelines so teams can innovate without increasing risk exposure.', 1),
('Building a Digital Transformation Roadmap', 'digital-transformation-roadmap', 'Digital Transformation Playbook', 'A practical framework for enterprise digital transformation.', 'Successful transformation begins with measurable outcomes, executive alignment, and incremental delivery.\n\nOur roadmap framework covers discovery, capability assessment, MVP definition, change management, and continuous optimization tied to business KPIs — not vanity metrics.', 1),
('How to Evaluate an Offshore Engineering Partner', 'evaluate-offshore-engineering-partner', 'Offshore Partner Evaluation Guide', 'Key criteria for selecting a reliable software delivery partner.', 'Choosing the right engineering partner impacts product quality, speed, and long-term maintainability.\n\nWe recommend evaluating technical depth, communication practices, security posture, delivery governance, and cultural fit before committing to a long-term engagement model.', 1);

-- ----------------------------------------------------------------
-- SAMPLE INQUIRY (optional)
-- ----------------------------------------------------------------
INSERT INTO ContactMessages (FullName, Email, Phone, CompanyName, ServiceInterest, Message, Status) VALUES
('Alexandra Pierce', 'alexandra.pierce@example.com', '+1 214 555 0142', 'Summit Logistics', 'Product Engineering', 'We are planning a platform modernization initiative for our operations portal and would like to discuss timeline, team structure, and engagement models.', 'New');
