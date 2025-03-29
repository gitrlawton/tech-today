"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { generateProductSummary } from "@/lib/api/nebius";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "ProductHunt AI",
    tagline: "AI-powered product recommendation and insights",
    description:
      "Get instant AI-powered feedback on your products. Includes market analysis, user feedback, and competitive landscape.",
    url: "https://example.com/producthunt-ai",
    thumbnail: "/images/product1.jpg",
    maker_image: "/images/avatar1.jpg",
    topics: ["AI", "Product", "Marketing"],
    summary:
      "ProductHunt AI is an innovative solution that provides AI-powered product recommendations and insights. It features an intuitive user interface and powerful functionality.",
    features: [
      {
        title: "AI-Powered Analysis",
        description:
          "Uses advanced machine learning to analyze product market fit and potential.",
      },
      {
        title: "Sentiment Analysis",
        description:
          "Automatically analyzes user feedback to detect positive and negative sentiment patterns.",
      },
      {
        title: "Competitive Intelligence",
        description:
          "Provides detailed comparisons with similar products in the marketplace.",
      },
    ],
    useCases: [
      "Startups can validate product ideas before full development.",
      "Product managers can identify which features resonate most with users.",
      "Marketers can fine-tune messaging based on actual user sentiment.",
    ],
    testimonials: [
      {
        quote:
          "This tool helped us pivot our product strategy and we saw a 120% increase in user engagement.",
        author: "Alex K., Startup Founder",
      },
      {
        quote:
          "The AI insights were spot on. Saved us months of market research.",
        author: "Patricia L., Product Director",
      },
      {
        quote:
          "We identified a critical feature gap that our competitors had missed.",
        author: "James W., CEO",
      },
    ],
  },
  {
    id: 2,
    name: "DevFlow",
    tagline: "Streamlined workflow for developers",
    description:
      "An all-in-one development environment with integrated CI/CD, code review, and project management tools.",
    url: "https://example.com/devflow",
    thumbnail: "/images/product2.jpg",
    maker_image: "/images/avatar2.jpg",
    topics: ["Development", "Productivity", "Tools"],
    summary:
      "DevFlow is a cutting-edge tool designed to streamline workflow for developers. It provides real-time analytics and actionable insights.",
    features: [
      {
        title: "Integrated CI/CD Pipeline",
        description:
          "Automated building, testing, and deployment with real-time feedback.",
      },
      {
        title: "Collaborative Code Reviews",
        description:
          "Inline comments, approval workflows, and automatic code quality checks.",
      },
      {
        title: "Project Management",
        description:
          "Task tracking, sprint planning, and team coordination all in one place.",
      },
    ],
    useCases: [
      "Development teams can reduce context switching between different tools.",
      "Tech leads can easily monitor project progress and code quality.",
      "Remote teams can collaborate more effectively with centralized workflows.",
    ],
    testimonials: [
      {
        quote:
          "DevFlow cut our deployment time by 70% and drastically reduced integration issues.",
        author: "Emily R., Lead Developer",
      },
      {
        quote:
          "The unified workflow solved our biggest pain point - switching between too many tools.",
        author: "David C., CTO",
      },
      {
        quote:
          "Our junior developers onboard much faster now with the integrated environment.",
        author: "Sophia T., Engineering Manager",
      },
    ],
  },
  {
    id: 3,
    name: "DesignSphere",
    tagline: "Collaborative design workspace",
    description:
      "A cloud-based design platform that allows teams to collaborate in real-time on UI/UX projects with built-in feedback tools.",
    url: "https://example.com/designsphere",
    thumbnail: "/images/product3.jpg",
    maker_image: "/images/avatar3.jpg",
    topics: ["Design", "Collaboration", "UI/UX"],
    summary:
      "DesignSphere is a revolutionary product that aims to provide a collaborative design workspace. It helps users save time and increase productivity.",
    features: [
      {
        title: "Real-time Collaboration",
        description:
          "Multiple designers can work on the same file simultaneously with live updates.",
      },
      {
        title: "Design System Management",
        description:
          "Create, maintain and implement design systems with automatic component updates.",
      },
      {
        title: "Prototyping & User Testing",
        description:
          "Build interactive prototypes and collect user feedback directly in the platform.",
      },
    ],
    useCases: [
      "Design teams can collaborate across time zones without version control issues.",
      "UX researchers can gather and implement feedback in the same environment.",
      "Companies can maintain consistent brand identity across all digital products.",
    ],
    testimonials: [
      {
        quote:
          "DesignSphere revolutionized how our global team works together. No more 'final_final_v2' files!",
        author: "Michelle K., Design Director",
      },
      {
        quote:
          "The design system features saved us countless hours of redundant work.",
        author: "Ryan B., UI Designer",
      },
      {
        quote:
          "Getting stakeholder feedback is now seamless, and we iterate much faster.",
        author: "Thomas L., Product Owner",
      },
    ],
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sampleProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sampleProducts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-full py-4 px-4">
      {/* Story navigation indicators */}
      <div className="w-full mb-2">
        <div className="flex justify-center space-x-3">
          {sampleProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-blue-500"
                  : "w-2 bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Card */}
      <div className="w-full max-w-sm h-[calc(100%-100px)] relative overflow-hidden">
        <ProductCard
          product={sampleProducts[currentIndex]}
          isActive={true}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center space-x-8 mt-2">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
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
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
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
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
