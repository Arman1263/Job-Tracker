// Realistic fictional sample data for demonstration purposes.
// These records are synthetic and do not correspond to real job vacancies.

export const SAMPLE_JOBS = [
  {
    id: "job-101",
    title: "Senior React / Frontend Architect",
    company: "NovaCloud Technologies",
    location: "San Francisco, CA (Remote)",
    workType: "Remote",
    salary: "$165,000 - $190,000",
    status: "Interview",
    appliedDate: "2026-10-02",
    jobUrl: "https://example.com/careers/novacloud-senior-frontend",
    contactPerson: "Sarah Lin (Lead Technical Recruiter)",
    tags: ["React 19", "TypeScript", "Performance", "Design Systems"],
    description: `NovaCloud Technologies is seeking an experienced Senior React Architect to drive frontend architecture across our enterprise observability platform.\n\nKey Responsibilities:\n• Modernize our high-throughput analytics dashboard rendering tens of thousands of telemetry events per second.\n• Collaborate with product designers to implement our next-generation component library.\n• Standardize state management patterns and optimize bundle size for sub-second load times.\n\nQualifications:\n• 5+ years of production experience in React, TypeScript, and modern JavaScript toolchains.\n• Deep familiarity with Web Performance metrics (Core Web Vitals), caching strategies, and accessibility (WCAG AA).\n• Exceptional communication skills and passion for mentoring junior engineers.`,
    notes: "Round 2 completed on Oct 12: Technical deep-dive into state modeling and performance profiling went very well. Final loop scheduled with VP of Engineering next Tuesday.",
    createdAt: "2026-10-02T10:30:00.000Z",
    updatedAt: "2026-10-12T16:45:00.000Z"
  },
  {
    id: "job-102",
    title: "Lead UI/UX Systems Engineer",
    company: "Apex Fintech Solutions",
    location: "New York, NY (Hybrid)",
    workType: "Hybrid",
    salary: "$175,000 - $205,000",
    status: "Offer",
    appliedDate: "2026-09-18",
    jobUrl: "https://example.com/jobs/apex-fintech-lead-ui",
    contactPerson: "Marcus Vance (Engineering Director)",
    tags: ["React", "TailwindCSS", "Figma", "Micro-frontends"],
    description: `Apex Fintech Solutions develops mission-critical institutional trading workflows and real-time execution tools.\n\nRole Overview:\nWe are hiring a Lead UI/UX Systems Engineer to bridge the gap between design vision and robust engineering execution. You will govern design tokens, establish component accessibility guidelines, and build reactive trading interfaces.\n\nRequirements:\n• Proven track record shipping complex SaaS or financial trading interfaces.\n• Fluency with micro-frontends, resilient data synchronization (WebSockets), and cross-browser testing.\n• Strong commitment to clean documentation and ergonomics for fellow engineers.`,
    notes: "Offer received on Oct 14! Total comp: $190k base + 15% annual bonus + equity grant. Reviewing health benefits and 401(k) matching. Decision deadline: Oct 28.",
    createdAt: "2026-09-18T14:15:00.000Z",
    updatedAt: "2026-10-14T09:20:00.000Z"
  },
  {
    id: "job-103",
    title: "Full Stack Engineer (Node & React)",
    company: "Horizon Analytics AI",
    location: "Austin, TX (Remote)",
    workType: "Remote",
    salary: "$140,000 - $160,000",
    status: "Applied",
    appliedDate: "2026-10-10",
    jobUrl: "https://example.com/careers/horizon-fullstack",
    contactPerson: "Elena Rostova (Talent Acquisition)",
    tags: ["React", "Node.js", "PostgreSQL", "REST APIs"],
    description: `Horizon Analytics powers automated business intelligence for Fortune 500 enterprises with generative AI synthesis.\n\nWhat You Will Do:\n• Develop customer-facing query builders, dashboard drill-down views, and export pipelines.\n• Build resilient Node.js microservices integrated with relational databases and asynchronous job workers.\n• Participate in agile sprints, architectural RFCs, and code review rotations.`,
    notes: "Application submitted via referral from alumni network. Recruiter confirmed application receipt; waiting for initial phone screen scheduling.",
    createdAt: "2026-10-10T08:00:00.000Z",
    updatedAt: "2026-10-10T08:00:00.000Z"
  },
  {
    id: "job-104",
    title: "Data Visualization & Dashboard Specialist",
    company: "PulseHealth Technologies",
    location: "Boston, MA (On-site)",
    workType: "On-site",
    salary: "$130,000 - $155,000",
    status: "Interview",
    appliedDate: "2026-09-29",
    jobUrl: "https://example.com/pulsehealth/careers/data-viz",
    contactPerson: "Dr. Jonathan Hayes (VP of Informatics)",
    tags: ["D3.js", "React", "Healthcare", "SVG"],
    description: `PulseHealth Technologies provides clinical decision support systems for hospital networks and cardiology clinics.\n\nPosition Details:\nWe need a specialist in interactive medical visualization to render patient vitals, longitudinal lab charts, and risk stratification models.\n\nDesired Profile:\n• Experience building custom SVG or Canvas visualizations with D3 and React.\n• Understanding of HIPAA compliance standards for frontend data security.\n• Strong eye for typography, information hierarchy, and color palettes that minimize clinician fatigue.`,
    notes: "Phone screen and take-home project completed. Code review session scheduled for this Thursday at 2 PM.",
    createdAt: "2026-09-29T11:45:00.000Z",
    updatedAt: "2026-10-11T13:10:00.000Z"
  },
  {
    id: "job-105",
    title: "Frontend Platform Engineer",
    company: "HyperScale Infrastructure",
    location: "Seattle, WA (Remote)",
    workType: "Remote",
    salary: "$150,000 - $180,000",
    status: "Saved",
    appliedDate: "2026-10-15",
    jobUrl: "https://example.com/hyperscale/platform-eng",
    contactPerson: "Careers Portal",
    tags: ["Vite", "Turborepo", "CI/CD", "TypeScript"],
    description: `HyperScale builds developer tooling and edge compute infrastructure. The Platform Team empowers 200+ product engineers with world-class build systems, preview environments, and testing infrastructure.\n\nRequirements:\n• Passion for build optimization (Vite, Rollup, esbuild, SWC).\n• Deep understanding of monorepo tooling and developer velocity metrics.\n• Track record of contributing to open source toolchains is a plus.`,
    notes: "Saved listing after checking company tech blog. Need to tailor resume to emphasize build pipeline optimizations and mono-repo migration experience before submitting.",
    createdAt: "2026-10-15T15:20:00.000Z",
    updatedAt: "2026-10-15T15:20:00.000Z"
  },
  {
    id: "job-106",
    title: "Product Engineer (Growth & Onboarding)",
    company: "Beacon Workspace",
    location: "Chicago, IL (Hybrid)",
    workType: "Hybrid",
    salary: "$135,000 - $155,000",
    status: "Rejected",
    appliedDate: "2026-09-05",
    jobUrl: "https://example.com/beacon/product-engineer",
    contactPerson: "Auto-notification",
    tags: ["React", "A/B Testing", "Analytics", "UX"],
    description: `Beacon Workspace is a modern team collaboration canvas. The Growth Team runs rapid experiment cycles to optimize free-to-paid conversion funnels, onboarding tours, and team invitation mechanics.`,
    notes: "Reached final stage; feedback was that they decided to proceed with an internal candidate who had direct prior experience in their exact billing provider stack. Recruiter offered to keep contact for future quarters.",
    createdAt: "2026-09-05T09:00:00.000Z",
    updatedAt: "2026-09-25T18:00:00.000Z"
  },
  {
    id: "job-107",
    title: "Senior Web Applications Developer",
    company: "QuantumFlow Networks",
    location: "Denver, CO (Remote)",
    workType: "Remote",
    salary: "$155,000 - $175,000",
    status: "Applied",
    appliedDate: "2026-10-14",
    jobUrl: "https://example.com/quantumflow/web-developer",
    contactPerson: "Rachel Green (Technical Sourcer)",
    tags: ["React", "GraphQL", "WebSockets", "CSS"],
    description: `QuantumFlow Networks provides enterprise software-defined networking interfaces. You will construct responsive real-time topology maps, routing configuration tables, and firewall audit logs.`,
    notes: "Applied directly on company portal. Automated confirmation email received.",
    createdAt: "2026-10-14T12:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z"
  }
];

export const STATUS_OPTIONS = [
  { value: "Saved", label: "Saved", color: "var(--status-saved)", bg: "var(--status-saved-bg)" },
  { value: "Applied", label: "Applied", color: "var(--status-applied)", bg: "var(--status-applied-bg)" },
  { value: "Interview", label: "Interview", color: "var(--status-interview)", bg: "var(--status-interview-bg)" },
  { value: "Offer", label: "Offer", color: "var(--status-offer)", bg: "var(--status-offer-bg)" },
  { value: "Rejected", label: "Rejected", color: "var(--status-rejected)", bg: "var(--status-rejected-bg)" }
];

export const WORK_TYPE_OPTIONS = ["Remote", "Hybrid", "On-site"];
