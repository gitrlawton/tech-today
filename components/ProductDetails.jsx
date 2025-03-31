import { useState } from "react";

// Function to clean HTML from comment text
const cleanCommentHTML = (htmlString) => {
  if (!htmlString) return "";

  return (
    htmlString
      // Replace <br> and </p> with newlines
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      // Replace <p> with newline if it's not the first tag
      .replace(/<p[^>]*>(?!\s*$)/gi, "\n")
      // Replace links with just their text content
      .replace(/<a[^>]*>([^<]+)<\/a>/g, "$1")
      // Remove any other HTML tags
      .replace(/<[^>]*>/g, "")
      // Decode HTML entities
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      // Replace multiple newlines with double newline
      .replace(/\n\s*\n/g, "\n\n")
      // Trim whitespace
      .trim()
  );
};

export default function ProductDetails({ product, onClose, isVisible }) {
  const [activeTab, setActiveTab] = useState("features");

  if (!isVisible || !product) return null;

  // Use product-specific data, or fallback to empty arrays if not available
  const features = product.features || [];
  const useCases = product.useCases || [];
  const testimonials = product.testimonials || [];

  // Get all comments from the product
  const comments = product.comments || [];

  return (
    <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-md z-20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-semibold text-white">{product.name} Details</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white"
          aria-label="Close details"
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("features")}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "features"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "testimonials"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          What people are saying
        </button>
      </div>

      {/* Content area */}
      <div className="flex-grow overflow-y-auto p-4">
        {activeTab === "features" ? (
          <div className="space-y-6">
            {features.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Key Features</h4>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="glass-card p-3 rounded-lg">
                      <h5 className="font-medium mb-1 text-white">
                        {feature.title}
                      </h5>
                      <p className="text-sm text-gray-300">
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {useCases.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">
                  Example Use Cases
                </h4>
                <ul className="space-y-2">
                  {useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-blue-900 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-blue-400 text-xs">✓</span>
                      </div>
                      <p className="text-sm text-gray-300">{useCase}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {features.length === 0 && useCases.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Feature information not available for this product.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">
              Comments from Product Hunt
            </h4>
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="glass-card p-4 rounded-lg">
                    <p className="text-sm mb-2 whitespace-pre-wrap text-gray-300">
                      {cleanCommentHTML(comment.body)}
                    </p>
                    <p className="text-xs text-gray-500">
                      User ID: {comment.id}
                    </p>
                  </div>
                ))}
              </div>
            ) : testimonials.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-lg font-medium mt-6 text-white">
                  Testimonials
                </h4>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="glass-card p-4 rounded-lg">
                    <p className="text-sm italic mb-2 text-gray-300">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.author}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No comments available for this product yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
