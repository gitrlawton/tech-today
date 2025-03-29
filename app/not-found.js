import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-xl mb-6">Page Not Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        href="/"
        className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
