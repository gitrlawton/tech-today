import Link from "next/link";

export default function Header({ className }) {
  return (
    <header
      className={`py-2 px-4 shadow-sm sticky top-0 bg-background z-10 ${className || ""}`}
    >
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          TechToday
        </Link>
        <nav className="space-x-4 text-sm">
          <Link
            href="/"
            className="font-medium hover:opacity-70 transition-opacity"
          >
            Feed
          </Link>
          <Link
            href="/about"
            className="font-medium hover:opacity-70 transition-opacity"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
