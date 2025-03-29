"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import AIDiscussion from "@/components/AIDiscussion";

// Sample product data (to be replaced with actual API data)
const sampleProducts = [
  {
    id: 1,
    name: "ProductHunt AI",
    tagline: "AI-powered product recommendation and insights",
    description:
      "Get instant AI-powered feedback on your products. Includes market analysis, user feedback, and competitive landscape.",
    long_description:
      "ProductHunt AI is a groundbreaking tool that leverages artificial intelligence to provide comprehensive insights into products. Whether you're a founder looking to improve your product, a marketer seeking competitive analysis, or an investor evaluating potential opportunities, ProductHunt AI delivers actionable intelligence tailored to your needs. The platform analyzes vast datasets from user reviews, market trends, and competitive landscapes to generate insights that would take humans days or weeks to compile.",
    url: "https://example.com/producthunt-ai",
    thumbnail: "/images/product1.jpg",
    maker_image: "/images/avatar1.jpg",
    maker_name: "AI Products Inc.",
    topics: ["AI", "Product", "Marketing", "Analysis", "Insights"],
    votes: 487,
    comments: 24,
    launch_date: "2023-03-15",
  },
  {
    id: 2,
    name: "DevFlow",
    tagline: "Streamlined workflow for developers",
    description:
      "An all-in-one development environment with integrated CI/CD, code review, and project management tools.",
    long_description:
      "DevFlow transforms how development teams collaborate by providing a unified platform that brings together code editing, version control, CI/CD pipelines, and project management. Instead of constantly switching between multiple tools, developers can stay in a single environment, increasing productivity and reducing context-switching. The intuitive interface accommodates developers of all skill levels, and powerful customization options ensure the platform grows with your team's needs.",
    url: "https://example.com/devflow",
    thumbnail: "/images/product2.jpg",
    maker_image: "/images/avatar2.jpg",
    maker_name: "DevTools Ltd.",
    topics: ["Development", "Productivity", "Tools", "CI/CD", "Collaboration"],
    votes: 362,
    comments: 19,
    launch_date: "2023-04-02",
  },
  {
    id: 3,
    name: "DesignSphere",
    tagline: "Collaborative design workspace",
    description:
      "A cloud-based design platform that allows teams to collaborate in real-time on UI/UX projects with built-in feedback tools.",
    long_description:
      "DesignSphere is revolutionizing how design teams work together by creating a shared virtual workspace where collaboration happens in real-time. Unlike traditional design tools that focus on individual work with occasional sharing, DesignSphere puts collaboration at the center of the experience. Multiple designers can work on the same project simultaneously, see each other's changes instantly, and provide contextual feedback without disrupting workflow. The platform includes advanced versioning, design system management, and developer handoff tools.",
    url: "https://example.com/designsphere",
    thumbnail: "/images/product3.jpg",
    maker_image: "/images/avatar3.jpg",
    maker_name: "CreativeTech Solutions",
    topics: ["Design", "Collaboration", "UI/UX", "Creative", "Teamwork"],
    votes: 295,
    comments: 31,
    launch_date: "2023-02-20",
  },
];

// Define colors for product backgrounds
const productColors = [
  "bg-blue-500 text-white",
  "bg-green-500 text-white",
  "bg-purple-500 text-white",
];

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAIDiscussion, setShowAIDiscussion] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real implementation, this would fetch from an API
        // For demo purposes, we'll find the product in our sample data
        const foundProduct = sampleProducts.find((p) => p.id.toString() === id);

        if (!foundProduct) {
          // Product not found, redirect to homepage
          router.push("/");
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return null; // This shouldn't happen because we redirect in useEffect
  }

  // Get color based on product ID
  const colorIndex = product.id % productColors.length;
  const backgroundColor = productColors[colorIndex];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Feed
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Product image placeholder */}
        <div className="relative w-full h-80">
          <div
            className={`absolute inset-0 ${backgroundColor} flex items-center justify-center`}
          >
            <span className="text-8xl font-bold">{product.id}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-500 mt-1">{product.tagline}</p>
            </div>

            <Link
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-center font-medium rounded-lg transition-colors inline-block"
            >
              Visit Product
            </Link>
          </div>

          <div className="flex items-center mb-6">
            {/* Maker avatar placeholder */}
            <div
              className={`w-12 h-12 rounded-full ${backgroundColor} flex items-center justify-center mr-4`}
            >
              <span className="font-bold text-lg">
                {product.maker_name?.charAt(0) || product.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">Made by</p>
              <p className="font-medium">{product.maker_name}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.long_description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {product.topics?.map((topic, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 text-red-500"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>{product.votes} votes</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 text-blue-500"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>{product.comments} comments</span>
              </div>
            </div>

            <button
              onClick={() => setShowAIDiscussion(true)}
              className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <span className="text-blue-500 text-sm font-medium">AI</span>
              </div>
              Ask AI
            </button>
          </div>
        </div>
      </div>

      {showAIDiscussion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <AIDiscussion
              product={product}
              onClose={() => setShowAIDiscussion(false)}
              isVisible={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
