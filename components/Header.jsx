import Link from "next/link";

export default function Header({ className }) {
  return (
    <header
      className={`py-2 px-4 sticky top-0 z-10 bg-black bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-800 ${className || ""}`}
    >
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-blue-400">
          TechToday
        </Link>
        <nav className="space-x-4 text-sm">
          <Link
            href="/"
            className="font-medium text-gray-300 hover:text-blue-400 transition-colors"
          >
            Feed
          </Link>
          <Link
            href="/about"
            className="font-medium text-gray-300 hover:text-blue-400 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
