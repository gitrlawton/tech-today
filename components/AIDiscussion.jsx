import { useState } from "react";
import { generateProductAnswer } from "@/lib/api/nebius";

export default function AIDiscussion({ product, onClose, isVisible }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi there! I'm TechToday's AI assistant. Ask me anything about ${product?.name || "this product"} and I'll try to answer it to the best of my ability!`,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get response from Nebius API
      const response = await generateProductAnswer(product, inputValue);

      const aiResponse = {
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I had trouble processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-900 z-20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Chat about {product?.name}</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
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

      {/* Messages area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about this product..."
            className="flex-grow bg-transparent focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="ml-2 p-2 text-blue-500 disabled:text-gray-400"
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
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
