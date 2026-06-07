import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-highest dark:bg-surface-container-lowest w-full py-lg mt-xl glass-card">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="flex flex-col items-center md:items-start gap-base">
          <span className="font-display-lg text-headline-sm text-primary">LeoLand</span>
          <p className="font-body-md text-on-surface-variant max-w-[20rem] text-center md:text-left">
            Building the world's most joyful language learning ecosystem for the next generation.
          </p>
        </div>
        <div className="flex gap-lg flex-wrap justify-center">
          <Link href="#" className="font-label-caps text-label-caps text-on-surface-variant hover:underline decoration-secondary underline-offset-4 transition-all">
            Privacy Policy
          </Link>
          <Link href="#" className="font-label-caps text-label-caps text-on-surface-variant hover:underline decoration-secondary underline-offset-4 transition-all">
            Terms of Service
          </Link>
          <Link href="#" className="font-label-caps text-label-caps text-on-surface-variant hover:underline decoration-secondary underline-offset-4 transition-all">
            Parent Guide
          </Link>
          <Link href="#" className="font-label-caps text-label-caps text-on-surface-variant hover:underline decoration-secondary underline-offset-4 transition-all">
            Support
          </Link>
        </div>
        <div className="text-right">
          <p className="font-body-md text-on-surface-variant opacity-60">© {new Date().getFullYear()} LeoLand Edutainment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
