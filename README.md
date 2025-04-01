# TechToday

Built by [Ryan Lawton](https://www.linkedin.com/in/rlawton714/) with [Nebius AI Studio](https://studio.nebius.com/) for the [GPT Wrapper Hackathon](https://www.sprint.dev/hackathons/gptwrapper).

## Overview

TechToday is an AI-powered web application that delivers daily tech insights by curating the top technologies, apps, and products from Product Hunt. The platform combines community-driven content with an engaging, social media story-like format, making it easy for busy professionals to stay updated on the latest innovations.

## Features

- **AI-Powered Insights**: Utilizes Qwen2.5-32B-Instruct via the Nebius AI Studio API to extract product features and generate use cases.
- **Interactive Experience**: Engaging Instagram story-inspired interface for browsing new products.
- **Daily Updates**: Refreshes featured products every day to showcase the latest innovations.
- **AI Assistant**: Users can message the AI assistant about any featured product and receive informative responses.

## How It Works

1. **Daily Fetching**: The application fetches the top-rated products from Product Hunt's API each day.
2. **AI Analysis**: The AI system analyzes product details, extracting key features and generating example use cases.
3. **User Interaction**: Users can browse through the day's top tech products in an easy-to-navigate format.
4. **Ask Questions**: Users can interact with the AI assistant to get answers about featured products.
5. **Visit Product**: Users can click on the "Visit Product" button on the product card to be redirected to the product's official website.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Firebase Firestore
- **AI**: Nebius AI Studio API with Qwen2.5-32B-Instruct
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Nebius API key
- Firebase configuration

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gitrlawton/techtoday.git
   ```
2. Install dependencies:
   ```bash
   cd techtoday
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEBIUS_API_KEY=your_nebius_api_key_here
   ```
4. Set up Firebase configuration in `firebaseConfig.js`.
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (example: `git checkout -b feature/AmazingFeature`)
3. Commit your changes (example: `git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (example: `git push origin feature/AmazingFeature`)
5. Open a Pull Request
