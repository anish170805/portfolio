export const SITE = {
  name: "Anish",
  github: "https://github.com/anish170805",
  linkedin: "https://www.linkedin.com/in/anish-goyal-772b4428b/",
  email: "goyalanish1708@gmail.com",
  // Footer year as shown in the reference mockup.
  footerYear: 2025,
  availability: "Available for opportunities",
} as const;

// Navigation order follows the mockup / README §6.
export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contacts" },
] as const;

// Page order, used by the active-section observer.
export const SECTION_ORDER = ["about", "projects", "experience", "skills", "contact"] as const;
