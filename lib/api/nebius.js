// Simulated Nebius LLM API integration
// In a real implementation, this would use the actual Nebius API

import { delay } from "../utils";

/**
 * Generate a product summary using the Nebius LLM
 * @param {Object} product - The product data to summarize
 * @returns {Promise<Object>} The summarized product data
 */
export async function generateProductSummary(product) {
  if (!product) throw new Error("Product data is required");

  // In a real implementation, this would call the Nebius LLM API
  // For demo purposes, we'll simulate a response

  // Simulate API call delay
  await delay(1500);

  // Generate a simulated summary based on the product data
  const summary = `${product.name} is ${generateRandomDescription(product.tagline)}. ${generateRandomFeatures()}`;

  // Return the product with the added summary
  return {
    ...product,
    summary,
  };
}

/**
 * Generate an answer to a question about a product
 * @param {Object} product - The product data
 * @param {string} question - The user's question
 * @returns {Promise<string>} The AI-generated answer
 */
export async function generateProductAnswer(product, question) {
  if (!product) throw new Error("Product data is required");
  if (!question) throw new Error("Question is required");

  // In a real implementation, this would call the Nebius LLM API
  // For demo purposes, we'll simulate a response

  // Simulate API call delay
  await delay(2000);

  // Generate a simulated answer based on the question and product
  return generateSimulatedAnswer(product, question);
}

// Helper functions for generating simulated responses

function generateRandomDescription(tagline) {
  const descriptions = [
    `an innovative solution that ${tagline.toLowerCase()}`,
    `a cutting-edge tool designed to ${tagline.toLowerCase()}`,
    `a revolutionary product that aims to ${tagline.toLowerCase()}`,
    `a new approach to ${tagline.toLowerCase()}`,
    `a thoughtfully designed platform that ${tagline.toLowerCase()}`,
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateRandomFeatures() {
  const features = [
    "It offers seamless integration with existing workflows.",
    "It provides real-time analytics and actionable insights.",
    "It features an intuitive user interface and powerful functionality.",
    "It helps users save time and increase productivity.",
    "It leverages cutting-edge AI technology to deliver personalized experiences.",
  ];

  return features[Math.floor(Math.random() * features.length)];
}

function generateSimulatedAnswer(product, question) {
  // Lowercase question for case-insensitive matching
  const lowerQuestion = question.toLowerCase();

  // Simple pattern matching to generate relevant responses
  if (lowerQuestion.includes("how") && lowerQuestion.includes("use")) {
    return `${product.name} is designed to be intuitive and user-friendly. You can start by visiting their website, creating an account, and following the onboarding process. The platform offers interactive tutorials that will guide you through all the key features.`;
  }

  if (lowerQuestion.includes("price") || lowerQuestion.includes("cost")) {
    return `${product.name} offers multiple pricing tiers to accommodate different needs. While I don't have the exact pricing details, they typically offer a free trial period, followed by subscription options ranging from basic to enterprise levels. I recommend checking their official website for the most up-to-date pricing information.`;
  }

  if (
    lowerQuestion.includes("alternative") ||
    lowerQuestion.includes("competitor")
  ) {
    return `There are several alternatives to ${product.name} in the market, each with its own strengths. However, what makes ${product.name} stand out is their unique approach to ${product.tagline.toLowerCase()}. Before considering alternatives, I'd recommend evaluating if ${product.name} meets your specific needs.`;
  }

  if (lowerQuestion.includes("review") || lowerQuestion.includes("rating")) {
    return `${product.name} has been generally well-received by users and industry experts. It's particularly praised for its ${product.tagline.toLowerCase()} capabilities. As with any product, individual experiences may vary depending on specific use cases and requirements.`;
  }

  // Default response for other questions
  return `Thanks for your question about ${product.name}. ${product.name} is designed to ${product.tagline.toLowerCase()}. While I don't have all the specific details about your question, I recommend checking their official documentation or reaching out to their support team for more information.`;
}
