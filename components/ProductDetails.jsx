import { useState } from "react";

export default function ProductDetails({ product, onClose, isVisible }) {
  const [activeTab, setActiveTab] = useState("features");

  if (!isVisible || !product) return null;

  // Use product-specific data, or fallback to empty arrays if not available
  const features = product.features || [];
  const useCases = product.useCases || [];
  const testimonials = product.testimonials || [];

  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-900 z-20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">{product.name} Details</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
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
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("features")}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "features"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "testimonials"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
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
                <h4 className="text-lg font-medium">Key Features</h4>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    >
                      <h5 className="font-medium mb-1">{feature.title}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {useCases.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Example Use Cases</h4>
                <ul className="space-y-2">
                  {useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-blue-500 text-xs">✓</span>
                      </div>
                      <p className="text-sm">{useCase}</p>
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
            <h4 className="text-lg font-medium">Customer Testimonials</h4>
            {testimonials.length > 0 ? (
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
                  >
                    <p className="text-sm italic mb-2">"{testimonial.quote}"</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.author}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No testimonials available for this product yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
