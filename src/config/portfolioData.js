// ============================================================================
// RESUME CONFIGURATION
// PASTE YOUR GOOGLE DRIVE RESUME LINK HERE:
// ============================================================================
// Replace the URL string below with your shareable Google Drive link.
// Example: "https://drive.google.com/file/d/1a2b3c4d5e6f/view?usp=sharing"
// Every Resume button across the entire website automatically uses this variable.
// ============================================================================
export const RESUME_URL = "PASTE_YOUR_GOOGLE_DRIVE_RESUME_LINK_HERE";

// ============================================================================
// PERSONAL INFORMATION & SOCIAL DATA
// ============================================================================
export const PERSONAL_INFO = {
  name: "Gurpreet Singh",
  title: "Third-Year B.Tech Computer Science Engineering Student",
  positioning: "Full-Stack Developer / CSE Student",
  university: "Sandip University",
  graduationYears: "2024 – 2028",
  cgpa: "8.0",
  summary:
    "Third-year B.Tech Computer Science Engineering student with a CGPA of 8.0 and hands-on exposure to Embedded Systems using Arduino IDE and ESP8266/ESP-12E. Currently learning MERN Full-Stack Development and strengthening programming fundamentals with basic Java knowledge. Interested in building practical software and embedded-system projects, with a focus on full-stack product development and competitive programming.",
  heroStatement:
    "Building practical software experiences while growing in full-stack development and computer science.",
  currentRole: {
    title: "Web Developer Intern",
    company: "Think Build",
    status: "Active Internship",
  },
  social: {
    email: "gurpreetsingh8936069690@gmail.com",
    phone: "+91-7209310503",
    phoneTel: "+917209310503",
    linkedin: "https://linkedin.com/in/gurpreet-singh-11b693421",
    github: "https://github.com/gurpreetsingh8936069690-web",
  },
};

// ============================================================================
// SKILLS DATA
// Categorized cleanly without exaggerated claims
// ============================================================================
export const SKILL_CATEGORIES = [
  {
    category: "Languages",
    skills: [
      { name: "C", level: null },
      { name: "C++", level: null },
      { name: "Java", level: "Basics" },
      { name: "JavaScript", level: null },
    ],
  },
  {
    category: "Web Development",
    skills: [
      { name: "MERN Full-Stack Development", level: "Currently Learning" },
    ],
  },
  {
    category: "Embedded Systems",
    skills: [
      { name: "Arduino IDE", level: null },
      { name: "ESP8266 / ESP-12E", level: null },
      { name: "GPIO", level: null },
      { name: "PWM", level: null },
      { name: "Sensors", level: null },
      { name: "Servo / Motor Control", level: null },
      { name: "RGB LED Control", level: null },
      { name: "Serial Communication", level: null },
    ],
  },
  {
    category: "Tools & Design",
    skills: [
      { name: "Git", level: null },
      { name: "GitHub", level: null },
      { name: "VS Code", level: null },
      { name: "Postman", level: null },
      { name: "Figma", level: null },
      { name: "Debugging", level: null },
      { name: "Antigravity", level: null },
    ],
  },
  {
    category: "Core Computer Science",
    skills: [
      { name: "Data Structures", level: null },
      { name: "Algorithms", level: null },
      { name: "OOPs", level: null },
      { name: "DBMS", level: "Basics" },
    ],
  },
  {
    category: "Emerging Technology",
    skills: [
      { name: "Generative AI", level: null },
      { name: "AI API Integration", level: null },
      { name: "Prompt Engineering", level: null },
    ],
  },
];

// ============================================================================
// PROJECTS DATA
// Only confirmed projects. No invented projects.
// ============================================================================
export const PROJECTS = [
  {
    id: "digital-marketing-website",
    title: "Digital Marketing Website",
    category: "Web Development",
    description:
      "Developed a responsive Digital Marketing website accessible across mobile, tablet, and desktop.",
    highlights: [
      "Responsive design",
      "Mobile-friendly experience",
      "Tablet compatibility",
      "Desktop compatibility",
      "Bug-free responsive experience",
      "Deployed on Vercel",
    ],
    tags: ["Responsive Web", "Vercel Deployment", "UI/UX", "Cross-Platform"],
    // Provide actual links or clearly marked placeholders
    liveUrl: "https://vercel.com", // Replace with your live Vercel URL
    githubUrl: "https://github.com/gurpreetsingh8936069690-web", // Replace with repository URL if specific repo exists
  },
  {
    id: "embedded-systems-projects",
    title: "Embedded Systems Projects — Arduino / ESP8266",
    category: "Embedded Systems & IoT",
    description:
      "Worked on embedded-system projects involving microcontrollers, sensors, GPIO, PWM, RGB LED control, and servo/motor control.",
    highlights: [
      "Arduino IDE",
      "ESP8266 / ESP-12E",
      "GPIO interfacing",
      "PWM signaling",
      "Sensors integration",
      "RGB LED control",
      "Servo/motor control",
      "Serial communication",
      "Hardware debugging",
      "Interfacing logic",
    ],
    tags: [
      "Arduino IDE",
      "ESP8266 / ESP-12E",
      "Microcontrollers",
      "Sensors & Actuators",
      "Serial Comms",
    ],
    // Repository placeholder
    githubUrl: "https://github.com/gurpreetsingh8936069690-web",
    liveUrl: null, // Hardware project - no live web URL
  },
  // Future project can be added here
];

// ============================================================================
// EXPERIENCE / PROFESSIONAL DEVELOPMENT
// ============================================================================
export const EXPERIENCE = [
  {
    role: "Web Developer Intern",
    company: "Think Build",
    type: "Internship",
    status: "Current",
    description:
      "Currently doing an internship at Think Build as a Web Developer Intern, focusing on responsive web interfaces, modern frontend implementation, and expanding full-stack development skills.",
    points: [
      "Active internship focusing on web development practices and components.",
      "Hands-on experience with modern web development workflows and clean code structure.",
      "Collaborating on web-based implementations while growing full-stack capabilities.",
    ],
  },
];

// ============================================================================
// ACHIEVEMENTS & LEADERSHIP
// ============================================================================
export const ACHIEVEMENTS = [
  {
    title: "NASA Space Apps Challenge Hackathon",
    role: "Participant",
    category: "Hackathon",
    description:
      "Participated in the international NASA Space Apps Challenge Hackathon, tackling real-world challenge statements with collaborative problem-solving.",
  },
  {
    title: "SunHacks 2K25",
    role: "Participant",
    category: "Hackathon",
    description:
      "Participated in SunHacks 2K25, building and prototyping technical solutions in a fast-paced hackathon setting.",
  },
  {
    title: "SunHacks 2K26",
    role: "Discipline Coordinator",
    category: "Leadership & Event Coordination",
    description:
      "Served as Discipline Coordinator for SunHacks 2K26, supporting overall event coordination, venue discipline, and participant flow.",
  },
  {
    title: "Sandip Utsav",
    role: "Discipline Coordinator",
    category: "University Event Leadership",
    description:
      "Served as Discipline Coordinator for Sandip Utsav, supporting large-scale event coordination and discipline management across student gatherings.",
  },
  {
    title: "TCS Expert Talk Session at Sandip Foundation",
    role: "Event Organizer",
    category: "Technical Events",
    description:
      "Organized and managed an Expert Talk Session conducted by Tata Consultancy Services (TCS) at Sandip Foundation.",
  },
  {
    title: "Engineers' Day at Sandip University",
    role: "Event Lead",
    category: "Campus Leadership",
    description:
      "Served as Event Lead for Engineers' Day at Sandip University, coordinating event execution, stage proceedings, and student activities.",
  },
];

// Dedicated highlight for Mahakhumbh Rojgar Mela Job Fair
export const SPECIAL_HIGHLIGHT = {
  title: "Mahakhumbh Rojgar Mela Job Fair",
  venue: "Sandip University",
  role: "Organizer & Anchor",
  scopeDescription:
    "Organized and managed the Mahakhumbh Rojgar Mela Job Fair held at Sandip University, described as one of the biggest job fairs in Maharashtra. Also served as the anchor throughout the major event.",
  highlights: [
    "Organized and managed event logistics and coordination at Sandip University",
    "Served as the anchor guiding proceedings during the job fair",
    "Recognized as one of the largest job fairs in Maharashtra",
  ],
};

// ============================================================================
// EDUCATION
// ============================================================================
export const EDUCATION = {
  degree: "Bachelor of Technology — Computer Science Engineering",
  shortDegree: "B.Tech in Computer Science Engineering",
  university: "Sandip University",
  duration: "2024 – 2028",
  yearOfStudy: "Third Year",
  cgpa: "8.0",
};

// ============================================================================
// CORE INTERESTS
// ============================================================================
export const INTERESTS = [
  {
    name: "Full-Stack Product Development",
    description:
      "Designing responsive, reliable, and user-centric web applications from UI components to database models.",
  },
  {
    name: "Competitive Programming",
    description:
      "Sharpening algorithmic thinking, data structures implementation, and problem-solving efficiency in C++ and Java.",
  },
  {
    name: "Embedded Systems",
    description:
      "Bridging software and physical hardware using ESP8266, Arduino IDE, sensors, and microcontrollers.",
  },
  {
    name: "MERN Full-Stack Development",
    description:
      "Strengthening modern JavaScript, React frontend architecture, Express, Node.js, and MongoDB fundamentals.",
  },
];

// ============================================================================
// CONTACT FORM, DATABASE & EMAIL CONFIGURATION
// ============================================================================
export const CONTACT_CONFIG = {
  // Destination email where every message will be sent:
  targetEmail: "gurpreetsingh8936069690@gmail.com",

  // Primary delivery method: 'formsubmit' | 'web3forms' | 'custom_webhook'
  // 'formsubmit' is 100% free and sends formatted emails directly to your Gmail
  service: "formsubmit",

  // Optional: Web3Forms access key (provides email + online cloud database dashboard)
  // Get a free key at https://web3forms.com
  web3FormsAccessKey: "",

  // Optional: Google Sheet Webhook URL (appends responses to your Google Sheet)
  googleSheetWebhookUrl: "",
};

