export function toCamelCase(value) {
  if (Array.isArray(value)) {
    return value.map(toCamelCase);
  }

  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.entries(value).reduce((acc, [key, val]) => {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      acc[camelKey] = toCamelCase(val);
      return acc;
    }, {});
  }

  return value;
}

export function toPascalCaseKeys(obj) {
  const map = {
    serviceId: 'ServiceId',
    industryId: 'IndustryId',
    caseStudyId: 'CaseStudyId',
    jobId: 'JobId',
    jobApplicationId: 'JobApplicationId',
    teamMemberId: 'TeamMemberId',
    testimonialId: 'TestimonialId',
    officeId: 'OfficeId',
    pageId: 'PageId',
    contactMessageId: 'ContactMessageId',
    siteSettingId: 'SiteSettingId',
    userId: 'UserId',
    title: 'Title',
    slug: 'Slug',
    shortDescription: 'ShortDescription',
    description: 'Description',
    icon: 'Icon',
    imageUrl: 'ImageUrl',
    metaTitle: 'MetaTitle',
    metaDescription: 'MetaDescription',
    displayOrder: 'DisplayOrder',
    isFeatured: 'IsFeatured',
    isActive: 'IsActive',
    clientName: 'ClientName',
    problem: 'Problem',
    solution: 'Solution',
    resultSummary: 'ResultSummary',
    pdfUrl: 'PdfUrl',
    department: 'Department',
    location: 'Location',
    jobType: 'JobType',
    experienceLevel: 'ExperienceLevel',
    requirements: 'Requirements',
    responsibilities: 'Responsibilities',
    fullName: 'FullName',
    email: 'Email',
    phone: 'Phone',
    linkedInUrl: 'LinkedInUrl',
    portfolioUrl: 'PortfolioUrl',
    resumeUrl: 'ResumeUrl',
    coverLetter: 'CoverLetter',
    applicationStatus: 'ApplicationStatus',
    designation: 'Designation',
    bio: 'Bio',
    companyName: 'CompanyName',
    companyUrl: 'CompanyUrl',
    region: 'Region',
    isJobSeeker: 'IsJobSeeker',
    message: 'Message',
    rating: 'Rating',
    country: 'Country',
    city: 'City',
    officeTitle: 'OfficeTitle',
    address: 'Address',
    latitude: 'Latitude',
    longitude: 'Longitude',
    pageName: 'PageName',
    content: 'Content',
    serviceInterest: 'ServiceInterest',
    status: 'Status',
    settingKey: 'SettingKey',
    settingValue: 'SettingValue',
    serviceIds: 'ServiceIds',
    industryIds: 'IndustryIds',
  };

  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined) continue;
    const column = map[key] || key.charAt(0).toUpperCase() + key.slice(1);
    result[column] = val;
  }
  return result;
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
