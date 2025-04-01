import { NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    // Fetch products from Firestore using client SDK
    const productsRef = collection(db, "top-products");
    const productsQuery = query(productsRef, orderBy("rank", "asc"));
    const snapshot = await getDocs(productsQuery);

    if (snapshot.empty) {
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    // Convert Firestore documents to plain objects
    const products = snapshot.docs.map((doc) => {
      const data = doc.data();

      // Extract first 3 topics from the topics array
      const topicNames =
        data.topics && Array.isArray(data.topics)
          ? data.topics.map((topic) => topic.name).slice(0, 3)
          : [];

      // Create a summary from the description or tagline
      const summary = data.description || data.tagline || "";

      // Generate testimonials from comments if available
      const testimonials =
        data.comments && Array.isArray(data.comments)
          ? data.comments.slice(0, 3).map((comment) => ({
              quote: comment.body
                ? comment.body.substring(0, 150) +
                  (comment.body.length > 150 ? "..." : "")
                : "Great product!",
              author: "Product Hunt User",
            }))
          : [
              {
                quote: "This is an exciting product from Product Hunt!",
                author: "Product Hunt User",
              },
            ];

      // Format the product data to match what the frontend expects
      return {
        id: doc.id,
        name: data.name || "Untitled Product",
        tagline: data.tagline || "",
        description: data.description || "",
        slug: data.slug || doc.id,
        summary: summary,
        url: data.url || data.website || "#",
        website: data.website || data.url || "#",
        // Use the thumbnail URL or the first media item if available
        thumbnail:
          data.thumbnail?.url ||
          (data.media && data.media[0] && data.media[0].url) ||
          "",
        topics: topicNames,
        // Add these fields that are expected by the ProductCard component
        features: data.features,
        useCases: data.use_cases,
        testimonials: testimonials,
        // Keep the original data for any custom needs
        comments: data.comments || [],
        media: data.media || [],
        rank: data.rank || 0,
        fetchedAt: data.fetchedAt || new Date().toISOString(),
      };
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", message: error.message },
      { status: 500 }
    );
  }
}
