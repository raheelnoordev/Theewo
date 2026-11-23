-- ============================================================
-- EWO Technologies — Sample data for phpMyAdmin
-- Database: u399796477_CompanyProfile
--
-- RUN ORDER:
--   1) First create admin user (see HOSTINGER_DEPLOY.md or run: npm run seed)
--   2) Then run this file in phpMyAdmin > SQL tab
-- ============================================================

-- ------------------------------------------------------------
-- SITE SETTINGS (hero stats, contact info)
-- ------------------------------------------------------------
INSERT INTO SiteSettings (SettingKey, SettingValue) VALUES
('hero_title', 'Engineering Digital Excellence'),
('hero_subtitle', 'We design, build, and optimize enterprise-grade software products for organizations worldwide.'),
('stat_1_value', '10+'),
('stat_1_label', 'Core Specialties'),
('stat_2_value', '500+'),
('stat_2_label', 'Engineers Globally'),
('stat_3_value', '99.9%'),
('stat_3_label', 'Uptime SLA'),
('stat_4_value', '4.9/5'),
('stat_4_label', 'Client Satisfaction'),
('contact_email', 'info@ewotechnologies.com'),
('contact_phone', '+1 (214) 555-0199'),
('contact_address', '1200 Main Street, Suite 400, Dallas, TX 75202')
ON DUPLICATE KEY UPDATE SettingValue = VALUES(SettingValue);

-- ------------------------------------------------------------
-- SERVICES
-- ------------------------------------------------------------
INSERT INTO Services (Title, Slug, ShortDescription, Description, Icon, ImageUrl, MetaTitle, MetaDescription, DisplayOrder, IsFeatured, IsActive) VALUES
('Web Development', 'web-development', 'Custom web applications built for scale, security, and performance.', 'We deliver modern web platforms using React, Node.js, and cloud-native architectures. From MVPs to enterprise portals, our teams ship reliable software with clean APIs and maintainable codebases.', 'Globe', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', 'Web Development Services', 'Enterprise web development for global organizations.', 1, 1, 1),
('Mobile App Development', 'mobile-app-development', 'Native and cross-platform mobile apps for iOS and Android.', 'Our mobile engineers build high-performance apps with intuitive UX, offline support, and secure backend integration for field teams and consumer products.', 'Smartphone', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', 'Mobile App Development', 'iOS and Android application development.', 2, 1, 1),
('UI/UX Design', 'ui-ux-design', 'Product design that balances usability, brand, and conversion.', 'We run discovery workshops, create design systems, and prototype flows that reduce friction and improve adoption across web and mobile products.', 'Palette', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', 'UI/UX Design Services', 'Product design and user experience consulting.', 3, 1, 1),
('DevOps & Cloud', 'devops', 'CI/CD pipelines, infrastructure as code, and observability.', 'We automate deployments, harden cloud environments, and implement monitoring so your teams release faster with confidence.', 'Cloud', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'DevOps Services', 'Cloud infrastructure and DevOps automation.', 4, 0, 1),
('Generative AI Solutions', 'generative-ai', 'Practical AI integrations for support, search, and automation.', 'We embed LLM-powered features into existing products with guardrails, evaluation pipelines, and cost-aware architecture.', 'Sparkles', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 'Generative AI Development', 'Custom AI solutions for enterprise software.', 5, 1, 1),
('Cybersecurity', 'cybersecurity', 'Application security reviews, hardening, and compliance support.', 'Security assessments, penetration testing coordination, and secure SDLC practices for regulated industries.', 'ShieldCheck', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', 'Cybersecurity Services', 'Enterprise application security services.', 6, 0, 1);

-- ------------------------------------------------------------
-- INDUSTRIES
-- ------------------------------------------------------------
INSERT INTO Industries (Title, Slug, ShortDescription, Description, ImageUrl, DisplayOrder, IsActive) VALUES
('Healthcare', 'healthcare', 'HIPAA-aware systems for providers, payers, and health tech.', 'We build patient portals, clinical workflows, and integration layers that connect EHRs, labs, and billing platforms with strong audit trails.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', 1, 1),
('FinTech', 'fintech', 'Secure platforms for payments, lending, and financial operations.', 'From onboarding to transaction monitoring, we help fintech teams ship compliant products with resilient APIs and fraud-resistant design.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 2, 1),
('E-Commerce', 'e-commerce', 'High-conversion storefronts and omnichannel commerce backends.', 'We optimize catalog, checkout, and fulfillment integrations for retailers scaling across regions and marketplaces.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 3, 1),
('Logistics', 'logistics', 'Fleet, warehouse, and last-mile visibility platforms.', 'Real-time tracking, route optimization, and partner portals that reduce operational cost and improve SLA performance.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', 4, 1),
('Education', 'education', 'LMS platforms, student portals, and learning analytics.', 'Engaging digital learning experiences with role-based access, content delivery, and progress reporting at scale.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 5, 1);

-- ------------------------------------------------------------
-- CASE STUDIES
-- ------------------------------------------------------------
INSERT INTO CaseStudies (Title, Slug, ClientName, ShortDescription, Problem, Solution, ResultSummary, ImageUrl, PdfUrl, MetaTitle, MetaDescription, IsFeatured, IsActive) VALUES
('Healthcare Portal Modernization', 'healthcare-portal-modernization', 'Regional Care Network', 'Rebuilt a legacy patient portal serving 2M+ users with zero-downtime migration.', 'The client struggled with slow releases, outdated UX, and frequent outages during peak hours.', 'EWO delivered a React + Node.js platform with blue-green deployments, caching, and observability dashboards.', '40% faster page loads, 99.95% uptime, and 3x faster feature delivery within 9 months.', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800', NULL, 'Healthcare Portal Case Study', 'Enterprise healthcare portal modernization.', 1, 1),
('Fintech Onboarding Automation', 'fintech-onboarding-automation', 'NovaPay', 'Automated KYC workflows reducing manual review time by 60%.', 'Manual onboarding created bottlenecks and compliance risk for a fast-growing payments startup.', 'We integrated identity providers, built rules engines, and admin review queues with full audit logs.', 'Onboarding time dropped from 48 hours to under 4 hours while improving compliance scores.', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800', NULL, 'Fintech Onboarding Case Study', 'KYC automation for fintech.', 1, 1),
('Retail Order Management Hub', 'retail-order-management-hub', 'UrbanMart', 'Unified order management across web, mobile, and marketplace channels.', 'Disconnected systems caused inventory mismatches and delayed shipments.', 'A centralized OMS with event-driven sync connected Shopify, ERP, and warehouse APIs.', 'Order accuracy improved to 99.2% and support tickets fell by 35% in the first quarter.', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', NULL, 'Retail OMS Case Study', 'Omnichannel order management platform.', 1, 1);

-- Link case studies to services (adjust IDs if you already have rows)
INSERT INTO CaseStudyServices (CaseStudyId, ServiceId)
SELECT cs.CaseStudyId, s.ServiceId
FROM CaseStudies cs
JOIN Services s ON (
  (cs.Slug = 'healthcare-portal-modernization' AND s.Slug IN ('web-development', 'devops')) OR
  (cs.Slug = 'fintech-onboarding-automation' AND s.Slug IN ('web-development', 'generative-ai')) OR
  (cs.Slug = 'retail-order-management-hub' AND s.Slug IN ('web-development', 'mobile-app-development'))
);

-- Link case studies to industries
INSERT INTO CaseStudyIndustries (CaseStudyId, IndustryId)
SELECT cs.CaseStudyId, i.IndustryId
FROM CaseStudies cs
JOIN Industries i ON (
  (cs.Slug = 'healthcare-portal-modernization' AND i.Slug = 'healthcare') OR
  (cs.Slug = 'fintech-onboarding-automation' AND i.Slug = 'fintech') OR
  (cs.Slug = 'retail-order-management-hub' AND i.Slug = 'e-commerce')
);

-- ------------------------------------------------------------
-- JOBS
-- ------------------------------------------------------------
INSERT INTO Jobs (Title, Slug, Department, Location, JobType, ExperienceLevel, Description, Requirements, Responsibilities, IsActive) VALUES
('Senior Full Stack Engineer', 'senior-full-stack-engineer', 'Engineering', 'Dallas, TX / Remote', 'Full-time', 'Senior', 'Join our product engineering team building enterprise web platforms for global clients.', '5+ years with React and Node.js; MySQL/PostgreSQL; REST API design; Git workflows.', 'Own features end-to-end; code reviews; collaborate with design and DevOps; mentor junior engineers.', 1),
('UI/UX Designer', 'ui-ux-designer', 'Design', 'Remote', 'Full-time', 'Mid-level', 'Design intuitive product experiences for B2B and B2C software products.', 'Figma expertise; design systems; user research basics; portfolio required.', 'Wireframes and prototypes; usability testing; handoff to engineering; maintain design system.', 1),
('DevOps Engineer', 'devops-engineer', 'Platform', 'Austin, TX / Remote', 'Full-time', 'Mid-level', 'Build and maintain CI/CD pipelines and cloud infrastructure on AWS/Azure.', 'Docker, Kubernetes, Terraform; monitoring (Grafana/Prometheus); Linux administration.', 'Automate deployments; improve reliability; security hardening; on-call rotation.', 1);

-- ------------------------------------------------------------
-- TEAM MEMBERS
-- ------------------------------------------------------------
INSERT INTO TeamMembers (FullName, Designation, Bio, ImageUrl, LinkedInUrl, DisplayOrder, IsActive) VALUES
('Raheel Noor', 'Founder & CEO', 'Leads EWO Technologies with a focus on scalable product engineering and long-term client partnerships.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'https://linkedin.com', 1, 1),
('Sarah Mitchell', 'VP of Engineering', 'Oversees delivery excellence across distributed engineering teams and platform architecture.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'https://linkedin.com', 2, 1),
('James Carter', 'Head of Design', 'Drives product design strategy, design systems, and user research for enterprise clients.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'https://linkedin.com', 3, 1),
('Aisha Khan', 'Delivery Manager', 'Coordinates agile delivery, client communication, and quality assurance across programs.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'https://linkedin.com', 4, 1);

-- ------------------------------------------------------------
-- TESTIMONIALS
-- ------------------------------------------------------------
INSERT INTO Testimonials (ClientName, ClientDesignation, CompanyName, Message, ImageUrl, Rating, IsActive) VALUES
('Michael Roberts', 'CTO', 'HealthBridge Systems', 'EWO rebuilt our patient portal on time and under budget. Their engineering discipline and communication were outstanding throughout the program.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200', 5, 1),
('Emily Watson', 'Product Director', 'NovaPay', 'The team integrated complex KYC workflows quickly and helped us pass our compliance audit on the first attempt.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200', 5, 1),
('David Chen', 'Operations Lead', 'UrbanMart', 'Our order management hub eliminated inventory sync issues across channels. Support load dropped significantly within weeks of launch.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200', 5, 1);

-- ------------------------------------------------------------
-- OFFICES
-- ------------------------------------------------------------
INSERT INTO Offices (Country, City, OfficeTitle, Address, Phone, Email, Latitude, Longitude, DisplayOrder, IsActive) VALUES
('United States', 'Dallas', 'EWO Technologies HQ', '1200 Main Street, Suite 400, Dallas, TX 75202', '+1 (214) 555-0199', 'info@ewotechnologies.com', 32.7767000, -96.7970000, 1, 1),
('United Kingdom', 'London', 'EWO Europe Office', '25 Canada Square, London E14 5LQ', '+44 20 7946 0958', 'europe@ewotechnologies.com', 51.5054000, -0.0235000, 2, 1),
('Pakistan', 'Karachi', 'EWO Delivery Center', 'Clifton Block 5, Karachi', '+92 21 34567890', 'delivery@ewotechnologies.com', 24.8138000, 67.0299000, 3, 1);

-- ------------------------------------------------------------
-- CMS PAGES (Resources section)
-- ------------------------------------------------------------
INSERT INTO Pages (PageName, Slug, MetaTitle, MetaDescription, Content, IsActive) VALUES
('Why Cloud-Native Architecture Matters', 'why-cloud-native-architecture-matters', 'Cloud-Native Architecture Guide', 'Learn why cloud-native patterns improve scalability and reliability.', 'Cloud-native architecture helps teams deploy faster, recover from failures automatically, and scale services independently.\n\nAt EWO, we guide clients through containerization, observability, and secure CI/CD pipelines that reduce operational risk while accelerating delivery.', 1),
('Building Secure APIs', 'building-secure-apis', 'API Security Best Practices', 'Practical API security patterns for enterprise software.', 'Secure APIs require authentication, authorization, input validation, rate limiting, and audit logging.\n\nWe implement OAuth2/JWT patterns, role-based access, and automated security testing as part of every backend engagement.', 1),
('Digital Transformation Playbook', 'digital-transformation-playbook', 'Digital Transformation Guide', 'A practical playbook for enterprise digital transformation.', 'Successful transformation starts with clear outcomes, incremental delivery, and cross-functional alignment.\n\nOur playbook covers discovery, roadmap planning, MVP delivery, and continuous improvement cycles tied to measurable KPIs.', 1);

-- ------------------------------------------------------------
-- SAMPLE CONTACT MESSAGE (optional)
-- ------------------------------------------------------------
INSERT INTO ContactMessages (FullName, Email, Phone, CompanyName, ServiceInterest, Message, Status) VALUES
('John Smith', 'john@example.com', '+1 555-0100', 'Acme Corp', 'Web Development', 'We are looking for a partner to rebuild our customer portal. Please contact us to discuss timeline and budget.', 'New');
