import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import dynamic from 'next/dynamic';
import FireFliesBackground from "@/components/FireFliesBackground";
import Sound from "@/components/Sound";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Show spinner on client-side page transitions
const PageLoader = dynamic(() => import('@/components/PageLoader'), { ssr: false });

export const metadata = {
  title: {
    template:
      "Next.js Portfolio Created with Three.js and Tailwind CSS | Ayanda Kweyama",
    default:
      "Next.js Portfolio Created with Three.js and Tailwind CSS by Ayanda Kweyama",
  },
  description:
    "A unique creative portfolio designed by Ayanda Kweyama with cutting-edge technologies like Next.js, Tailwind CSS, Three.js, and Framer Motion. Experience the art of modern web development firsthand. Checkout Ayanda Kweyama on youtube.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          "bg-background text-foreground font-inter"
        )}
      >
        <PageLoader />
        {/* Logo home button, top-middle on mobile, top-left on desktop */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 sm:left-4 sm:translate-x-0 z-50">
          <Link href="/">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="Home"
              priority
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            />
          </Link>
        </div>
        {children}
        <FireFliesBackground />
        <Sound />
        <div id="my-modal" />
      </body>
    </html>
  );
}
