import "./globals.css";
import dynamic from 'next/dynamic';
const FireFliesBackground = dynamic(() => import('@/components/FireFliesBackground'), { ssr: false });
const Sound = dynamic(() => import('@/components/Sound'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });
import Link from "next/link";
import Image from "next/image";

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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-background text-foreground font-inter"
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
        <Chatbot />
        <div id="my-modal" />
      </body>
    </html>
  );
}
