import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { question, plan } = await req.json()

    if (!question || !plan) {
      return NextResponse.json({ error: "Question and plan are required" }, { status: 400 })
    }

    // Combine diet and workout plans for context
    const combinedPlan = `
Diet Plan:
${plan.dietPlan}

Workout Plan:
${plan.workoutPlan}
`

    // Construct the prompt for the AI
    const prompt = `
You are a fitness and diet expert. Answer the following user question based on the given plan:

Plan: ${combinedPlan}

Question: ${question}

Provide a clear, helpful, and detailed response. Use markdown formatting to make your answer readable.
Limit your response to information that is directly relevant to the question and the provided plan.
If the question is outside the scope of the plan, politely explain that and provide general fitness advice.
`

    // Generate the response using Groq's llama-3.3-70b-versatile model
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      maxTokens: 1000,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
