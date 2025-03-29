import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About TechToday",
  description:
    "Learn about TechToday and our mission to deliver daily tech insights powered by AI.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About TechToday</h1>
          <p className="text-xl text-gray-600">
            Delivering AI-powered insights on the latest technology innovations
          </p>
        </div>

        <div className="prose max-w-none">
          <h2>Our Mission</h2>
          <p>
            At TechToday, we believe staying informed about new technology
            shouldn't be time-consuming or overwhelming. Our mission is to
            curate and deliver the most relevant tech innovations daily,
            enhanced with AI-powered insights that make complex technologies
            easy to understand.
          </p>

          <h2>How It Works</h2>
          <p>
            Each day, we feature a new technology, app, or product that we
            believe deserves attention. We leverage the Nebius LLM to generate
            clear, engaging summaries that highlight why the technology matters
            and how it might benefit you or your organization.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>AI-Powered Summaries:</strong> We use the Nebius LLM to
              generate concise, informative overviews of each featured
              technology.
            </li>
            <li>
              <strong>Interactive Q&A:</strong> Ask follow-up questions about
              any featured technology and get AI-generated responses.
            </li>
            <li>
              <strong>Curated Categories:</strong> Browse technologies by
              category to find exactly what interests you.
            </li>
            <li>
              <strong>Daily Updates:</strong> A new technology is featured each
              day, keeping you continuously informed about the latest
              innovations.
            </li>
          </ul>

          <h2>Our Technology</h2>
          <p>
            TechToday is built using Next.js, a powerful React framework, and
            integrates with Nebius.com Studio to provide AI-powered summaries
            and interactive Q&A capabilities. The application fetches data from
            various sources, including the Product Hunt API, to ensure we're
            featuring the most exciting new technologies.
          </p>

          <div className="my-8 flex flex-col items-center">
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Explore Today's Featured Technology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
