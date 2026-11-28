import { projectsData } from "../app/data.js";
import { resumeUrl, socialLinks } from "../app/navigation.js";

export const chatMessageLimit = 1000;
export const chatHistoryLimit = 12;

// Public professional facts selected from Ayanda’s CV and career notes.
const about = "Ayanda Kweyama was born in Durban and finished high school there at Christian Progressive College. He earned a Diploma in ICT, specialising in Applications Development, at the University of Mpumalanga. He began his IT career as an intern at Beaufort West Municipality and has since combined full-stack development, IT support, and software development tutoring.";
const travel = "Ayanda is willing to travel for work. He finished high school in Durban, studied in Mpumalanga, and began his IT career in Beaufort West, so he has experience adapting to new places. For specific travel arrangements or relocation, contact Ayanda directly.";
const internship = "Ayanda began his IT career as an intern at Beaufort West Municipality from July 2025 to July 2026. He supported staff through the help desk, installed and configured hardware and software, helped troubleshoot LAN/WAN connectivity, maintained IT asset registers, and assisted with onboarding and user training.";
const teaching = "Ayanda’s CV lists software development tutoring at Zaio Institute of Technology, where he teaches JavaScript, REST APIs, Google Sheets, and n8n workflow automation through practical projects. He also tutored Applications Development at the University of Mpumalanga, helping students with web and mobile development, databases, and software engineering.";
const strengths = "Ayanda brings together full-stack development, hands-on IT support, and the ability to explain technical concepts. Sebenza-AI shows how he applied AI to career guidance, his municipal internship demonstrates practical troubleshooting and user support, and his tutoring shows how he helps others build technical skills.";
const skills = "Ayanda’s CV lists advanced skills in TypeScript, Kotlin, SQL, Django, HTML, CSS, Figma, and Adobe Illustrator. His projects also use React, Next.js, Node.js, and Tailwind CSS, and he teaches JavaScript, REST APIs, and workflow automation with n8n.";
const projectEvidence = {
  "Sebenza-AI": "Ayanda built Sebenza-AI with Next.js, TypeScript, Prisma, and the OpenAI API. Its Afrigter career advisor offers personalised guidance and interview preparation. He also built a Puppeteer-based job discovery feature with a swipe interface.",
  "ResPlug": "Ayanda built ResPlug with a Next.js frontend and Django backend to help students find verified accommodation near their university.",
  "Moroccan barber": "Ayanda connected a Next.js frontend to a Django REST API for the Moroccan Barber Booking System. Customers can browse services, choose a barber, check availability, and book appointments.",
  "UMP Merch": "Ayanda built the UMP Merch Store for University of Mpumalanga supporter kits and memorabilia. He designed a responsive admin dashboard and product management workflow using Django, SQLite, Jazzmin, and Bootstrap.",
};
const credentials = "Ayanda lists credentials in data analytics, Django, ITIL, user experience, and Microsoft 365 Fundamentals.";
const projectAliases = {
  1: ["sebenza", "career assistant"],
  2: ["merch", "ump store"],
  8: ["water dashboard", "beaufort west", "water status"],
  9: ["student accommodation"],
};

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const projectPhrases = projectsData.flatMap((project) =>
    [project.name, ...(project.category === "development" ? projectAliases[project.id] ?? [] : [])]
      .map((name) => ({ phrase: normalize(name), project }))
  ).sort((first, second) => second.phrase.length - first.phrase.length);

function findProject(question) {
  return projectPhrases.find(({ phrase }) => ` ${question} `.includes(` ${phrase} `))?.project;
}

export function portfolioReply(messages) {
  const question = normalize(messages.at(-1)?.content ?? "");
  if (/\b(travel|travels|travelling|traveling|relocate|relocation|onsite|on site|willing to move)\b/.test(question)) {
    return { message: travel, links: [{ label: "Discuss travel arrangements", href: "/contact" }] };
  }

  if (/\b(why (should|would|hire)|good fit|role fit|candidate|strengths?|stand out|what makes|bring to|recommend ayanda)\b/.test(question)) {
    return { message: strengths, links: [{ label: "See Ayanda’s work", href: "/projects" }, { label: "Contact Ayanda", href: "/contact" }] };
  }

  if (/\b(intern|internship|first (job|role)|help desk|it support|work history)\b/.test(question)) {
    return { message: internship, links: [{ label: "About Ayanda", href: "/about" }] };
  }

  if (/\b(tutor|tutoring|teach|teaches|teaching|mentor|mentoring|zaio)\b/.test(question)) {
    return { message: teaching, links: [{ label: "About Ayanda", href: "/about" }] };
  }

  if (/\b(born|high school|matric|diploma|graduat[a-z]*|hometown|durban|where (is|did) (he|ayanda) (from|study|grow up))\b/.test(question)) {
    return { message: about, links: [{ label: "About Ayanda", href: "/about" }] };
  }

  const normalizedHistory = messages.slice(0, -1).filter(({ role }) => role === "user").reverse();
  const isFollowUp = /\b(it|that project|this project|that one)\b/.test(question);
  const project = findProject(question) ?? (isFollowUp
    ? normalizedHistory.map(({ content }) => findProject(normalize(content))).find(Boolean)
    : undefined);

  if (project) {
    return {
      message: projectEvidence[project.name] ?? project.description,
      links: [{ label: `View ${project.name}`, href: `/projects/${project.slug ?? project.id}` }],
    };
  }

  if (/\b(resume|cv)\b/.test(question)) {
    return { message: "You can download Ayanda’s latest resume here.", links: [{ label: "Download resume", href: resumeUrl, download: true }] };
  }

  if (/\b(contact|email|hire|hiring|collaborate|linkedin|github|reach)\b/.test(question)) {
    return {
      message: "You can reach Ayanda through the portfolio’s Contact page or LinkedIn. His public code is on GitHub.",
      links: [{ label: "Contact Ayanda", href: "/contact" }, ...socialLinks.filter(({ label }) => label !== "X").map(({ label, link }) => ({ label, href: link }))],
    };
  }

  if (/\b(certification|certifications|certificates|credentials)\b/.test(question)) {
    return { message: credentials, links: [{ label: "View certifications", href: "/certifications" }] };
  }

  if (/\b(skills|stack|technologies|tech|react|kotlin|django|design)\b/.test(question)) {
    return { message: skills, links: [{ label: "See skills and tools", href: "/about" }] };
  }

  if (/\b(project|projects|portfolio|work|built)\b/.test(question)) {
    return { message: "Start with UMP Merch, an online store for university merchandise, and Sebenza-AI, a career assistant that analyzes CVs. The Projects page has more development and design work.", links: [{ label: "Browse projects", href: "/projects" }] };
  }

  if (/\b(about|experience|education|university|ayanda|background)\b/.test(question)) {
    return { message: about, links: [{ label: "About Ayanda", href: "/about" }] };
  }

  if (/^(hi|hey|hello|howzit|good morning|good afternoon)[ !]*$/.test(question)) {
    return { message: "Howzit! Ask me about UMP Merch, Sebenza-AI, Ayanda’s skills, or how to contact him." };
  }

  return {
    message: "I don’t have that detail. I can help with Ayanda’s projects, skills, certifications, and resume. You can also ask him directly.",
    links: [{ label: "Contact Ayanda", href: "/contact" }],
  };
}

export const portfolioContext = [
  about, travel, internship, teaching, strengths, skills, credentials,
  ...Object.values(projectEvidence),
  ...projectsData.map(({ name, description, slug, id }) => `${name}: ${description} (/projects/${slug ?? id})`),
  `Resume download: ${resumeUrl}. Contact: /contact.`,
  ...socialLinks.map(({ label, link }) => `${label}: ${link}`),
].join("\n");
