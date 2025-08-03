# AI Fitness and Diet Planner

A full-stack MERN application that uses AI to generate personalized workout and diet plans, along with a chat assistant for fitness-related queries.

# Deployment Link

https://ai-fitness-planner-six.vercel.app/

## Features

- Enter personal data and fitness goals
- Generate customized workout and diet plans using a large language model (llama-3.3-70b-versatile) hosted on Groq Cloud
- Chat with the AI to refine or ask questions about the plan

## Tech Stack

- **Frontend**: React with Next.js App Router and Tailwind CSS
- **Backend**: Next.js API Routes (Node.js/Express.js compatible)
- **Database**: MongoDB (optional for saving user history or plans)
- **AI Integration**: AI SDK with Groq provider
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Groq API key

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/ai-fitness-planner.git
   cd ai-fitness-planner
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file in the root directory and add your Groq API key:
   \`\`\`
   GROQ_API_KEY=your_groq_api_key
   \`\`\`

   Optional: If using MongoDB, add your MongoDB connection string:
   \`\`\`
   MONGODB_URI=your_mongodb_connection_string
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

\`\`\`
/ai-fitness-planner/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   │   ├── chat/         # Chat API
│   │   └── generate-plan/ # Plan Generation API
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── chat-box.tsx      # Chat interface
│   ├── fitness-form.tsx  # User input form
│   └── plan-display.tsx  # Display generated plans
├── lib/                  # Utility functions
│   └── db.ts             # Database connection (optional)
└── public/               # Static assets
\`\`\`

## Deployment

This project can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your environment variables (GROQ_API_KEY, MONGODB_URI if using MongoDB)
4. Deploy

## License

MIT
