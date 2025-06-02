const { MongoClient } = require("mongodb");

async function createUsersCollection() {
  const uri = "mongodb://localhost:27017"; // Local MongoDB Compass
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("AIFitnessPlanner");
    const users = db.collection("users");

    // Example documents (5 users)
    const sampleUsers = [
      {
        username: "qwerty",
        email: "qwerty@gmail.com",
        password: "qwerty",
        age: 22,
        height_cm: 155,
        weight_kg: 52,
      },
      {
        username: "john_doe",
        email: "john@example.com",
        password: "john123",
        age: 30,
        height_cm: 180,
        weight_kg: 75,
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: "jane123",
        age: 27,
        height_cm: 165,
        weight_kg: 60,
      },
      {
        username: "mike89",
        email: "mike@gmail.com",
        password: "mikepass",
        age: 29,
        height_cm: 175,
        weight_kg: 70,
      },
      {
        username: "sara92",
        email: "sara@example.com",
        password: "sara456",
        age: 24,
        height_cm: 160,
        weight_kg: 55,
      }
    ];

    await users.insertMany(sampleUsers);
    console.log("Users collection created and 5 sample users added.");
  } finally {
    await client.close();
  }
}

createUsersCollection().catch(console.error);
