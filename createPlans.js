const { MongoClient } = require("mongodb");

async function createPlansCollection() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("AIFitnessPlanner");
    const users = db.collection("users");
    const plans = db.collection("plans");

    const usernames = ["qwerty", "john_doe", "jane_smith", "mike89", "sara92"];

    const workoutTypes = ["Cardio", "Strength", "Yoga", "Pilates", "HIIT"];
    const dietTypes = ["High Protein", "Low Carb", "Keto", "Vegan", "Balanced"];
    const dietaryRestrictions = ["Vegetarian", "None", "Gluten-Free", "Dairy-Free", "Paleo"];

    for (const username of usernames) {
      const user = await users.findOne({ username });

      if (!user) {
        console.log(`User ${username} not found.`);
        continue;
      }

      const plansForUser = [];

      for (let i = 0; i < 5; i++) {
        const plan = {
          userId: user._id,
          workoutType: workoutTypes[Math.floor(Math.random() * workoutTypes.length)],
          dietType: dietTypes[Math.floor(Math.random() * dietTypes.length)],
          currentWeight: user.weight_kg,
          targetWeight: user.weight_kg - Math.floor(Math.random() * 5 + 1), // Random target weight
          age: user.age,
          gender: "Not specified", // Or fetch if you have it
          dietaryRestriction: dietaryRestrictions[Math.floor(Math.random() * dietaryRestrictions.length)],
          healthCondition: "None",
          numberOfWeeks: Math.floor(Math.random() * 8) + 4, // 4 to 12 weeks
          additionalComments: "This is a customized plan to help achieve goals!",
        };

        plansForUser.push(plan);
      }

      await plans.insertMany(plansForUser);
      console.log(`5 plans created for user: ${username}`);
    }

    console.log("All plans created successfully!");
  } finally {
    await client.close();
  }
}

createPlansCollection().catch(console.error);
