import { useState } from "react";
import Link from "next/link";
import AIDiscussion from "./AIDiscussion";
import ProductDetails from "./ProductDetails";

export default function ProductCard({
  product,
  isActive = false,
  onNext,
  onPrevious,
}) {
  const [showAIDiscussion, setShowAIDiscussion] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!product) return null;

  // Define colors for product backgrounds
  const productColors = [
    "bg-blue-500 text-white",
    "bg-green-500 text-white",
    "bg-purple-500 text-white",
  ];

  // Get a consistent color based on product ID
  const colorIndex = product.id % productColors.length;
  const backgroundColor = productColors[colorIndex];

  // If the card is not active, don't render it at all
  if (!isActive) return null;

  return (
    <div className="product-card flex flex-col w-full h-full bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden relative border border-gray-200 dark:border-gray-800">
      {/* Progress bar at top */}
      <div className="w-full h-1 bg-gray-200">
        <div className="h-full bg-blue-500" style={{ width: "100%" }} />
      </div>

      {/* Product image placeholder */}
      <div className="w-full h-52">
        <div
          className={`w-full h-full ${backgroundColor} flex items-center justify-center`}
        >
          <span className="text-6xl font-bold">{product.id}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-4 overflow-y-auto pb-20 border-0">
        <div className="flex items-center mb-3">
          {/* Maker avatar placeholder */}
          <div
            className={`w-10 h-10 rounded-full ${backgroundColor} flex items-center justify-center mr-3`}
          >
            <span className="font-bold">{product.name.charAt(0)}</span>
          </div>
          <div>
            <Link href={`/product/${product.id}`} className="hover:underline">
              <h3 className="font-bold text-lg">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-500">{product.tagline}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm">{product.description || product.summary}</p>
        </div>

        <div className="flex space-x-2 mb-4">
          {product.topics?.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="flex space-x-2 mb-16 relative z-20">
          <Link
            href={product.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-center font-medium rounded-lg transition-colors"
          >
            Visit Product
          </Link>

          <button
            onClick={() => setShowDetails(true)}
            className="py-2 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-center font-medium rounded-lg transition-colors"
          >
            Details
          </button>
        </div>
      </div>

      {/* Navigation controls - adjust z-index and height to not cover buttons */}
      <div
        className="absolute left-0 top-0 h-2/3 w-1/3 z-10"
        onClick={onPrevious}
      />
      <div
        className="absolute right-0 top-0 h-2/3 w-1/3 z-10"
        onClick={onNext}
      />

      {/* AI Discussion component */}
      {!showAIDiscussion && !showDetails && (
        <div
          className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md flex items-center cursor-pointer z-20"
          onClick={() => setShowAIDiscussion(true)}
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-blue-500 text-lg">AI</span>
          </div>
          <p className="text-sm text-gray-500">Ask about this product...</p>
        </div>
      )}

      {/* AI Discussion Modal */}
      {showAIDiscussion && (
        <AIDiscussion
          product={product}
          onClose={() => setShowAIDiscussion(false)}
          isVisible={showAIDiscussion}
        />
      )}

      {/* Product Details Modal */}
      <ProductDetails
        product={product}
        onClose={() => setShowDetails(false)}
        isVisible={showDetails}
      />
    </div>
  );
}
