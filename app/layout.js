import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TechToday - Discover Top Tech Products Daily",
  description:
    "Get daily updates on the top 16 technologies, apps, and products from Product Hunt with AI-powered summaries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="flex flex-col h-screen">
          <Header className="flex-shrink-0" />
          <main className="flex-grow flex items-center justify-center overflow-y-auto">
            <div className="story-feed-container flex flex-col justify-center h-full">
              {children}
            </div>
          </main>
          <Footer className="flex-shrink-0" />
        </div>
      </body>
    </html>
  );
}
