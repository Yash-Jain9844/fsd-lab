// This is an optional MongoDB integration
// Uncomment and use if you want to save user data and plans

import { MongoClient, ServerApiVersion } from "mongodb"

const uri = process.env.MONGODB_URI || ""
const dbName = "fitness_planner"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export async function connectToDatabase() {
  try {
    await client.connect()
    return client.db(dbName)
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

export async function savePlan(userId: string, userData: any, plan: any) {
  const db = await connectToDatabase()

  // Save user data if it doesn't exist
  await db
    .collection("users")
    .updateOne({ _id: userId }, { $set: { ...userData, updatedAt: new Date() } }, { upsert: true })

  // Save the plan
  return db.collection("plans").insertOne({
    userId,
    userData,
    plan,
    createdAt: new Date(),
  })
}

export async function getUserPlans(userId: string) {
  const db = await connectToDatabase()
  return db.collection("plans").find({ userId }).sort({ createdAt: -1 }).toArray()
}

export async function saveChat(userId: string, planId: string, messages: any[]) {
  const db = await connectToDatabase()
  return db.collection("chats").insertOne({
    userId,
    planId,
    messages,
    createdAt: new Date(),
  })
}
