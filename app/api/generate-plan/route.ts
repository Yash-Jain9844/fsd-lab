import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const {
      workoutType,
      dietType,
      currentWeight,
      targetWeight,
      dietaryRestrictions,
      healthConditions,
      age,
      gender,
      numberOfWeeks,
      additionalComments,
    } = await req.json()

    // Construct the prompt for the AI
    const prompt = `
You are a fitness and diet planner. Using the following inputs, create two detailed plans:
1. A diet plan table listing day-to-day food intake for ${numberOfWeeks} weeks.
2. A workout plan table listing day-to-day exercises for ${numberOfWeeks} weeks.

Inputs:
- Workout type: ${workoutType}
- Diet type: ${dietType}
- Current weight: ${currentWeight} kg
- Target weight: ${targetWeight} kg
- Dietary restrictions: ${dietaryRestrictions || "None"}
- Health conditions: ${healthConditions || "None"}
- Age: ${age}
- Gender: ${gender}
- Other instructions: ${additionalComments || "None"}

Format your response in Markdown with proper tables. Make sure to:

1. Start with a brief introduction explaining the plan
2. For the diet plan:
   - Create a table with columns: Day, Meal, Food Items, Portion Size, Calories
   - Use proper Markdown table syntax with | and - characters
   - Include a header row with column names
   - List meals for each day of the week, repeated for ${numberOfWeeks} weeks
   - Include specific portion sizes and calorie estimates

3. For the workout plan:
   - Create a table with columns: Day, Exercise, Sets, Reps/Duration, Rest, Notes
   - Use proper Markdown table syntax with | and - characters
   - Include a header row with column names
   - List exercises for each day of the week, repeated for ${numberOfWeeks} weeks
   - Include rest days in the plan
   - Add notes for proper form or modifications

Example table format:
| Day | Meal | Food Items | Portion Size | Calories |
|-----|------|------------|--------------|----------|
| Monday | Breakfast | Oatmeal with berries | 1 cup | 300 |

Split your response into two clear sections: "DIET PLAN" and "WORKOUT PLAN".
Each section should start with a brief description followed by the table.
`

    // Generate the plan using Groq's llama-3.3-70b-versatile model
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      maxTokens: 4000,
    })

    // Parse the response to separate diet and workout plans
    const dietPlanMatch = text.match(/DIET PLAN([\s\S]*?)(?=WORKOUT PLAN|$)/i)
    const workoutPlanMatch = text.match(/WORKOUT PLAN([\s\S]*?)$/i)

    const dietPlan = dietPlanMatch ? dietPlanMatch[1].trim() : "Diet plan not generated."
    const workoutPlan = workoutPlanMatch ? workoutPlanMatch[1].trim() : "Workout plan not generated."

    return NextResponse.json({ dietPlan, workoutPlan })
  } catch (error) {
    console.error("Error generating plan:", error)
    return NextResponse.json({ error: "Failed to generate plan" }, { status: 500 })
  }
}
