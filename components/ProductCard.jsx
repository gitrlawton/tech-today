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

  // Create media array from product media, ensuring thumbnail isn't duplicated
  let mediaItems = [];

  // First add non-thumbnail media items
  if (product.media && Array.isArray(product.media)) {
    mediaItems = product.media
      .filter((item) => item.url && item.url !== product.thumbnail)
      .map((item) => ({ ...item }));
  }

  // If we have no media items, use the thumbnail as the only item
  if (mediaItems.length === 0 && product.thumbnail) {
    mediaItems.push({ type: "image", url: product.thumbnail });
  }

  // If still no media items, add a placeholder
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
    <div className="product-card flex flex-col w-full h-full glass-card rounded-xl overflow-hidden relative">
      {/* Progress bar at top */}
      {/* <div className="w-full h-1 bg-gray-800">
        <div className="h-full bg-gray-800" style={{ width: "100%" }} />
      </div> */}

      {/* Media carousel */}
      <div className="w-full h-[212px] relative">
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
                  index === currentMediaIndex ? "bg-blue-400" : "bg-gray-600"
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
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 text-white z-20"
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 text-white z-20"
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
      <div className="flex-grow p-4 overflow-y-auto pb-4 border-0 flex flex-col">
        <div className="flex items-center mb-3">
          {/* Product thumbnail as avatar */}
          {product.thumbnail ? (
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0 border border-gray-700">
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
              <h3 className="font-bold text-lg text-white">
                {product.name || "Untitled Product"}
              </h3>
            </Link>
            <p className="text-sm text-gray-400">
              {product.tagline || "No tagline available"}
            </p>
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap space-x-2 mb-3">
          {(product.topics || []).slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="px-2 py-1 my-1 bg-gray-800 text-gray-300 text-xs rounded-full flex-shrink-0 border border-gray-700"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Description with truncation */}
        <div className="mb-4 flex-grow">
          <p className="text-sm text-gray-300 overflow-ellipsis overflow-hidden">
            {getTruncatedDescription()}
          </p>
        </div>

        {/* Action buttons fixed at bottom of content area */}
        <div className="flex flex-col space-y-4 mt-auto relative">
          <div className="flex space-x-2">
            <Link
              href={product.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 glass-button text-blue-300 text-center font-medium rounded-lg transition-colors"
            >
              Visit Product
            </Link>

            <button
              onClick={() => setShowDetails(true)}
              className="py-2 px-4 secondary-button text-gray-300 text-center font-medium rounded-lg transition-colors"
            >
              Details
            </button>
          </div>

          {/* AI Discussion component */}
          {!showAIDiscussion && !showDetails && (
            <div
              className="glass-card p-3 rounded-full shadow-lg flex items-center cursor-pointer border border-gray-700"
              onClick={() => setShowAIDiscussion(true)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                <span className="text-blue-300 text-lg">AI</span>
              </div>
              <p className="text-sm text-gray-400">Ask about this product...</p>
            </div>
          )}
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
    </div>
  );
}
