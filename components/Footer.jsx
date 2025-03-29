import Link from "next/link";

export default function Footer({ className }) {
  return (
    <footer
      className={`py-2 px-4 bg-gray-50 dark:bg-gray-900 ${className || ""}`}
    >
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between items-center text-xs">
        <div className="mb-1 md:mb-0">
          <p className="text-gray-500">
            © {new Date().getFullYear()} TechToday
          </p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/about"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
