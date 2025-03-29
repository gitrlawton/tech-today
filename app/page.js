"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { generateProductSummary } from "@/lib/api/nebius";

// Sample product data (to be replaced with actual API data)
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
