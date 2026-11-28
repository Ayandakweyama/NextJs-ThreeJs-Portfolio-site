import { projectsData } from "../app/data.js";
import { resumeUrl, socialLinks } from "../app/navigation.js";

export const chatMessageLimit = 1000;
export const chatHistoryLimit = 12;

const about = "Ayanda Kweyama is a South African software developer and UI/UX designer. He studied ICT at the University of Mpumalanga and builds web and mobile applications.";
const skills = "Ayanda works with React, Next.js, JavaScript, TypeScript, and Tailwind CSS on the frontend. His mobile work uses Kotlin and React Native, and his backend projects use tools such as Django, Node.js, and PostgreSQL. He also works with Figma and UI/UX design.";
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
  const normalizedHistory = messages.slice(0, -1).filter(({ role }) => role === "user").reverse();
  const isFollowUp = /\b(it|that project|this project|that one)\b/.test(question);
  const project = findProject(question) ?? (isFollowUp
    ? normalizedHistory.map(({ content }) => findProject(normalize(content))).find(Boolean)
    : undefined);

  if (project) {
    return {
      message: project.description,
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
  about, skills, credentials,
  ...projectsData.map(({ name, description, slug, id }) => `${name}: ${description} (/projects/${slug ?? id})`),
  `Resume download: ${resumeUrl}. Contact: /contact.`,
  ...socialLinks.map(({ label, link }) => `${label}: ${link}`),
].join("\n");
