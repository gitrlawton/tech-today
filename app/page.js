"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from our API endpoint
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          setError("No products found");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
        <p className="text-gray-700 dark:text-gray-300">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-xl font-bold mb-2">No Products Available</h2>
        <p className="text-gray-700 dark:text-gray-300">
          There are currently no products to display.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between h-full py-4 px-4 bg-gradient-to-b from-gray-900 to-black">
      {/* Story navigation indicators */}
      <div className="w-full mb-2">
        <div className="flex justify-center space-x-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Card */}
      <div className="w-full max-w-sm min-w-[360px] h-[600px] relative overflow-hidden">
        <ProductCard
          product={products[currentIndex]}
          isActive={true}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center space-x-8 mt-2">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full secondary-button focus:outline-none"
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
          className="p-2 rounded-full secondary-button focus:outline-none"
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
