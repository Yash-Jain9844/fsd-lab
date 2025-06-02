const { MongoClient } = require("mongodb");

async function insertWorkoutPlans() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("AIFitnessPlanner");
    const workoutPlans = db.collection("workoutPlans");

    const users = [
      {
        username: "john_doe",
        planName: "Cardio Keto Plan",
        goal: "Maintain cardiovascular health",
        planType: "Cardio",
        durationWeeks: 4,
        exercises: [
          { day: "Monday", exercise: "Jogging", duration: "30 minutes", intensity: "Moderate" },
          { day: "Tuesday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Wednesday", exercise: "Cycling", duration: "30 minutes", intensity: "High" },
          { day: "Thursday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Friday", exercise: "Swimming", duration: "30 minutes", intensity: "Moderate" },
          { day: "Saturday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Sunday", exercise: "Brisk walking", duration: "30 minutes", intensity: "Low" }
        ]
      },
      {
        username: "alex_fit",
        planName: "Strength Endurance Plan",
        goal: "Improve muscular endurance",
        planType: "Strength",
        durationWeeks: 4,
        exercises: [
          { day: "Monday", exercise: "Push-ups", duration: "3 sets", intensity: "High" },
          { day: "Tuesday", exercise: "Squats", duration: "3 sets", intensity: "Moderate" },
          { day: "Wednesday", exercise: "Plank", duration: "3 x 1 min", intensity: "High" },
          { day: "Thursday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Friday", exercise: "Burpees", duration: "3 sets", intensity: "High" },
          { day: "Saturday", exercise: "Lunges", duration: "3 sets", intensity: "Moderate" },
          { day: "Sunday", exercise: "Rest", duration: "-", intensity: "-" }
        ]
      },
      {
        username: "emma_yoga",
        planName: "Flexibility and Balance",
        goal: "Improve flexibility",
        planType: "Yoga",
        durationWeeks: 4,
        exercises: [
          { day: "Monday", exercise: "Sun Salutations", duration: "20 minutes", intensity: "Low" },
          { day: "Tuesday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Wednesday", exercise: "Standing Poses", duration: "30 minutes", intensity: "Moderate" },
          { day: "Thursday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Friday", exercise: "Seated Poses", duration: "25 minutes", intensity: "Low" },
          { day: "Saturday", exercise: "Balance Poses", duration: "15 minutes", intensity: "Moderate" },
          { day: "Sunday", exercise: "Rest", duration: "-", intensity: "-" }
        ]
      },
      {
        username: "mike_strength",
        planName: "Bodybuilding Plan",
        goal: "Build muscle mass",
        planType: "Strength",
        durationWeeks: 4,
        exercises: [
          { day: "Monday", exercise: "Chest & Triceps", duration: "45 minutes", intensity: "High" },
          { day: "Tuesday", exercise: "Back & Biceps", duration: "45 minutes", intensity: "High" },
          { day: "Wednesday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Thursday", exercise: "Legs", duration: "45 minutes", intensity: "High" },
          { day: "Friday", exercise: "Shoulders", duration: "30 minutes", intensity: "Moderate" },
          { day: "Saturday", exercise: "Abs & Core", duration: "30 minutes", intensity: "Moderate" },
          { day: "Sunday", exercise: "Rest", duration: "-", intensity: "-" }
        ]
      },
      {
        username: "lucy_cardio",
        planName: "HIIT Cardio Plan",
        goal: "Burn fat and boost stamina",
        planType: "HIIT",
        durationWeeks: 4,
        exercises: [
          { day: "Monday", exercise: "Jump Rope Intervals", duration: "20 minutes", intensity: "High" },
          { day: "Tuesday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Wednesday", exercise: "Sprints", duration: "20 minutes", intensity: "High" },
          { day: "Thursday", exercise: "HIIT Bodyweight Circuit", duration: "30 minutes", intensity: "High" },
          { day: "Friday", exercise: "Rest", duration: "-", intensity: "-" },
          { day: "Saturday", exercise: "Mountain Climbers & Plank Jacks", duration: "20 minutes", intensity: "High" },
          { day: "Sunday", exercise: "Rest", duration: "-", intensity: "-" }
        ]
      }
    ];

    const expandedWorkoutPlans = users.map(user => {
      const fullPlan = [];
      for (let week = 1; week <= user.durationWeeks; week++) {
        user.exercises.forEach(entry => {
          fullPlan.push({
            week,
            day: entry.day,
            exercise: entry.exercise,
            duration: entry.duration,
            intensity: entry.intensity
          });
        });
      }
      return {
        planName: user.planName,
        username: user.username,
        goal: user.goal,
        planType: user.planType,
        durationWeeks: user.durationWeeks,
        workoutSchedule: fullPlan
      };
    });

    await workoutPlans.insertMany(expandedWorkoutPlans);
    console.log("✅ 5 users' workout plans inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting workout plans:", err);
  } finally {
    await client.close();
  }
}

insertWorkoutPlans();