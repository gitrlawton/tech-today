import { NextResponse } from "next/server";
import OpenAI from "openai";

// Function to clean HTML from comment text (copied from ProductDetails)
const cleanCommentHTML = (htmlString) => {
  if (!htmlString) return "";

  // Replace HTML tags with appropriate content
  return (
    htmlString
      // Remove paragraph tags
      .replace(/<\/?p>/g, "")
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
      // Trim whitespace
      .trim()
  );
};

export async function POST(request) {
  console.log("Inside the POST method.");
  try {
    const { product, messages } = await request.json();

    console.log("Product received:", product?.name);
    console.log(
      "Has comments?",
      product?.comments ? `Yes (${product.comments.length})` : "No"
    );

    if (product?.comments && product.comments.length > 0) {
      console.log("First comment sample:", product.comments[0]);
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Valid messages array is required" },
        { status: 400 }
      );
    }

    // Create product context from description and comments
    const productContext = `
        Product Name: ${product?.name || "Unknown"}
        Description: ${product?.description || "No description available"}
        ${
          product?.comments && product.comments.length > 0
            ? `User Comments: ${product.comments.map((c) => `"${cleanCommentHTML(c.body)}" - User ID: ${c.id}`).join(", ")}`
            : "No user comments available"
        }
      `;

    // Prepare system message with product context
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI assistant for TechToday, a tech product discovery platform. 
          Your task is to answer questions about the following product based on the information provided below.
          
          PRODUCT INFORMATION:
          ${productContext}
          
          INSTRUCTIONS:
          1. When answering questions, prioritize information from the description and user comments.
          2. Use specific details and quotes from user comments when relevant.
          3. Be factual and only make claims supported by the product information provided.
          4. If asked about something not mentioned in the provided information, acknowledge that you don't have that specific information.
          5. Keep your answers helpful, informative, and focused on the product.
          6. Answer with confidence.  Don't use words like "seems" which convey uncertainty.
          7. Do not refer to questions left in the user comments.
          
          Remember, your goal is to help users understand this product based solely on the information provided above.`,
    };

    // Log the actual data for debugging
    console.log("Product data structure:", JSON.stringify(product, null, 2));
    console.log("Product context being sent:", productContext);

    // Combine system message with user conversation history
    const completeMessages = [systemMessage, ...messages];

    const client = new OpenAI({
      baseURL: "https://api.studio.nebius.com/v1/",
      apiKey: process.env.NEBIUS_API_KEY,
    });

    const completion = await client.chat.completions.create({
      temperature: 0.6,
      model: "Qwen/Qwen2.5-Coder-32B-Instruct-fast",
      messages: completeMessages,
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error in discussion API route:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
