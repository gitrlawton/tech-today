import { useState, useEffect } from "react";
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
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [truncateLength, setTruncateLength] = useState(200);

  // Handle missing product data
  if (!product) return null;

  // Define colors for product backgrounds
  const productColors = [
    "bg-blue-500 text-white",
    "bg-green-500 text-white",
    "bg-purple-500 text-white",
    "bg-red-500 text-white",
    "bg-yellow-500 text-black",
    "bg-indigo-500 text-white",
    "bg-pink-500 text-white",
  ];

  // Get a consistent color based on product ID or name
  const productId =
    typeof product.id === "string"
      ? parseInt(product.id.replace(/\D/g, "") || "0", 10)
      : product.id || 0;
  const colorIndex = productId % productColors.length;
  const backgroundColor = productColors[colorIndex];

  // Create media array combining product thumbnail and media
  const mediaItems = [];
  if (product.thumbnail) {
    mediaItems.push({ type: "image", url: product.thumbnail });
  }
  if (product.media && Array.isArray(product.media)) {
    // Add unique media items that aren't duplicates of the thumbnail
    product.media.forEach((item) => {
      if (item.url && item.url !== product.thumbnail) {
        mediaItems.push(item);
      }
    });
  }

  // If no media items, add a placeholder
  if (mediaItems.length === 0) {
    mediaItems.push({ type: "placeholder" });
  }

  // Media carousel controls
  const nextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === mediaItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };

  // Function to handle description truncation with ellipsis
  const getTruncatedDescription = () => {
    const text =
      product.description || product.summary || "No description available";
    if (text.length <= truncateLength) return text;
    return text.substring(0, truncateLength) + "...";
  };

  // If the card is not active, don't render it at all
  if (!isActive) return null;

  return (
    <div className="product-card flex flex-col w-full h-full bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden relative border border-gray-200 dark:border-gray-800">
      {/* Progress bar at top */}
      <div className="w-full h-1 bg-gray-200">
        <div className="h-full bg-blue-500" style={{ width: "100%" }} />
      </div>

      {/* Media carousel */}
      <div className="w-full h-52 relative">
        {mediaItems[currentMediaIndex].type === "placeholder" ? (
          <div
            className={`w-full h-full ${backgroundColor} flex items-center justify-center`}
          >
            <span className="text-6xl font-bold">
              {product.name?.charAt(0) || "#"}
            </span>
          </div>
        ) : mediaItems[currentMediaIndex].type === "video" ? (
          <video
            src={mediaItems[currentMediaIndex].url}
            className="w-full h-full object-cover"
            controls
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.innerHTML = `
                <div class="${backgroundColor} w-full h-full flex items-center justify-center">
                  <span class="text-6xl font-bold">${product.name?.charAt(0) || "#"}</span>
                </div>
              `;
            }}
          />
        ) : (
          <img
            src={mediaItems[currentMediaIndex].url}
            alt={`${product.name} - media ${currentMediaIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "";
              e.target.parentNode.innerHTML = `
                <div class="${backgroundColor} w-full h-full flex items-center justify-center">
                  <span class="text-6xl font-bold">${product.name?.charAt(0) || "#"}</span>
                </div>
              `;
            }}
          />
        )}

        {/* Media carousel navigation dots */}
        {mediaItems.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentMediaIndex
                    ? "bg-white"
                    : "bg-gray-400 bg-opacity-50"
                }`}
                aria-label={`View media item ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Media carousel arrows (only if multiple items) */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1 text-white z-20"
              aria-label="Previous media"
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
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1 text-white z-20"
              aria-label="Next media"
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
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow p-4 overflow-y-auto pb-24 border-0 flex flex-col">
        <div className="flex items-center mb-3">
          {/* Product thumbnail as avatar */}
          {product.thumbnail ? (
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                  e.target.parentNode.innerHTML = `
                    <div class="${backgroundColor} w-10 h-10 rounded-full flex items-center justify-center">
                      <span class="font-bold">${product.name?.charAt(0) || "#"}</span>
                    </div>
                  `;
                }}
              />
            </div>
          ) : (
            <div
              className={`w-10 h-10 rounded-full ${backgroundColor} flex items-center justify-center mr-3 flex-shrink-0`}
            >
              <span className="font-bold">
                {product.name?.charAt(0) || "#"}
              </span>
            </div>
          )}
          <div>
            <Link href={`/product/${product.id}`} className="hover:underline">
              <h3 className="font-bold text-lg">
                {product.name || "Untitled Product"}
              </h3>
            </Link>
            <p className="text-sm text-gray-500">
              {product.tagline || "No tagline available"}
            </p>
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap space-x-2 mb-3">
          {(product.topics || []).slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="px-2 py-1 my-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full flex-shrink-0"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Description with truncation */}
        <div className="mb-4 flex-grow">
          <p className="text-sm overflow-ellipsis overflow-hidden">
            {getTruncatedDescription()}
          </p>
        </div>

        {/* Action buttons fixed at bottom of content area */}
        <div className="flex space-x-2 mt-auto relative z-20">
          <Link
            href={product.url || product.website || "#"}
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

      {/* Navigation controls - adjust z-index and height to only cover the top media portion */}
      <div
        className="absolute left-0 top-0 h-52 w-1/3 z-10"
        onClick={onPrevious}
      />
      <div
        className="absolute right-0 top-0 h-52 w-1/3 z-10"
        onClick={onNext}
      />

      {/* AI Discussion component */}
      {!showAIDiscussion && !showDetails && (
        <div
          className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md flex items-center cursor-pointer z-30"
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
