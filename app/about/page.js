import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About TechToday",
  description:
    "Learn about TechToday and our mission to deliver daily tech insights powered by AI.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">About TechToday</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          TechToday delivers a curated selection of the top technologies, apps,
          and products from Product Hunt each day, presented in an engaging,
          social media story-inspired format.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          Our mission is to help busy professionals stay updated on the latest
          innovations without having to spend hours searching through product
          listings. We combine the community-driven appeal of Product Hunt with
          the convenience of a daily digest.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">
            <strong>AI-Powered Product Features and Use Cases:</strong> We use
            Qwen2.5-32B-Instruct via the Nebius AI Studio API to extract product
            features and generate use cases for each product.
          </li>
          <li className="mb-2">
            <strong>Interactive Experience:</strong> Our Instagram
            story-inspired interface makes browsing new products fun and
            intuitive.
          </li>
          <li className="mb-2">
            <strong>Daily Updates:</strong> We refresh our featured products
            every day, ensuring you always see the latest innovations.
          </li>
          <li className="mb-2">
            <strong>Ask Questions:</strong> Use our AI assistant to get answers
            about any featured product.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">How It Works</h2>
        <p className="mb-4">
          Each day, we fetch the top-rated products from Product Hunt's API. Our
          AI system then analyzes the product details and extracts key product
          features and generates example use cases. These are presented to you
          in an easy-to-navigate, story-like format where you can quickly browse
          through the day's top tech products.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>
          Have questions or feedback? I'd love to hear from you! Feel free to
          reach out on{" "}
          <a
            href="https://www.linkedin.com/in/rlawton714/"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </div>
  );
}
