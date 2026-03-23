# Ayanda Kweyama - Portfolio Site

> **A 3D-powered, interactive developer portfolio built with Next.js, Three.js, and Tailwind CSS.**

A personal portfolio showcasing my projects, skills, certifications, and contact info. Built with modern frontend technologies and creative 3D visuals for an immersive experience. Features an AI chatbot assistant (Kwanda) powered by OpenAI.

---

## Live Demo

[**View Live Site**](https://next-js-three-js-portfolio-site-ayanda-s-projects.vercel.app/)

---

## Features

- **High-performance** rendering with Next.js App Router
- **3D models and animations** via Three.js and React Three Fiber
- **Responsive design** powered by Tailwind CSS
- **Smooth page transitions** with Framer Motion
- **AI Chatbot (Kwanda)** - personal assistant powered by OpenAI, with South African personality
- **Email contact form** with EmailJS integration
- **Audio player** with background music toggle
- **Dynamic project filtering** by category (Development, UX/UI, Graphic)
- **Certifications showcase** with modal previews
- **Resume/CV download** available directly from the site

---

## Tech Stack

| Technology           | Description                            |
|----------------------|----------------------------------------|
| **Next.js 14**       | React framework with App Router        |
| **Three.js**         | WebGL-powered 3D JavaScript library    |
| **React Three Fiber**| React renderer for Three.js            |
| **Tailwind CSS**     | Utility-first CSS framework            |
| **Framer Motion**    | React animation library                |
| **OpenAI API**       | AI chatbot (gpt-4o-mini)               |
| **EmailJS**          | Send emails directly from the browser  |
| **React Hook Form**  | Lightweight form validation            |
| **Sharp**            | Image optimization                     |

---

## Project Structure

```
NextJs-ThreeJs-Portfolio-site
├── public/
│   ├── audio/             # Background music files
│   ├── background/        # Page background images
│   ├── certifications/    # Certification images
│   ├── models/            # 3D model files (.glb)
│   └── projects/          # Project screenshots and resume
├── src/
│   ├── app/
│   │   ├── api/chat/      # OpenAI chatbot API route
│   │   ├── (sub pages)/   # About, Projects, Contact, Certifications
│   │   ├── data.js        # Projects and navigation data
│   │   └── page.js        # Home page
│   └── components/
│       ├── models/        # 3D model components (Wizard, AsusLaptop, etc.)
│       ├── about/         # About section components
│       ├── contact/       # Contact form
│       ├── navigation/    # Navigation system
│       ├── projects/      # Project cards and layout
│       ├── Chatbot.jsx    # AI chatbot (Kwanda)
│       ├── Sound.jsx      # Audio player
│       └── RenderModel.jsx # Three.js canvas wrapper
├── .env.example           # Environment variable template
├── .env.local             # Local environment variables (not committed)
├── next.config.mjs        # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies and scripts

