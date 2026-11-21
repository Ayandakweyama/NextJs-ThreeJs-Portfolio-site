import "./globals.css";
import localFont from "next/font/local";
import Sound from "@/components/Sound";
import Chatbot from "@/components/Chatbot";
import SiteAtmosphere from "@/components/SiteAtmosphere";
import SiteHeader from "@/components/SiteHeader";
import { resumeUrl, socialLinks } from "./navigation";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: {
    template: "%s | Ayanda Kweyama",
    default: "Ayanda Kweyama | Full-stack developer",
  },
  description:
    "Explore Ayanda Kweyama’s full-stack applications, interface design, and interactive web projects.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} relative isolate bg-background text-foreground font-inter`}>
        <SiteAtmosphere>
          <SiteHeader />
          {children}
          <footer className="mx-auto flex max-w-6xl flex-wrap gap-5 px-6 pb-24 pt-8 text-sm text-white/75">
            {socialLinks.map(({ label, link }) => (
              <a key={label} href={link} className="underline underline-offset-4 hover:text-white">{label}</a>
            ))}
            <a href={resumeUrl} download className="underline underline-offset-4 hover:text-white">Download resume</a>
          </footer>
        </SiteAtmosphere>
        <Sound />
        <Chatbot />
      </body>
    </html>
  );
}
