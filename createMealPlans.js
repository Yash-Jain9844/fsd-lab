const { MongoClient } = require("mongodb");

async function insertMoreDietPlans() {
  const uri = "mongodb://localhost:27017"; // Your MongoDB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("AIFitnessPlanner");
    const dietPlans = db.collection("dietPlans");

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const janeMeals = [
      {
        breakfast: "Chia pudding with strawberries",
        lunch: "Quinoa salad with grilled tofu",
        dinner: "Lentil soup with mixed veggies",
        snacks: "Apple slices with peanut butter"
      },
      {
        breakfast: "Smoothie bowl with granola",
        lunch: "Stuffed bell peppers",
        dinner: "Grilled mushrooms with asparagus",
        snacks: "Protein bar"
      },
      {
        breakfast: "Oats with almonds and honey",
        lunch: "Whole grain pasta with tomato sauce",
        dinner: "Veggie curry and brown rice",
        snacks: "Boiled chickpeas"
      },
      {
        breakfast: "Multigrain toast with avocado",
        lunch: "Veggie wrap with hummus",
        dinner: "Stir-fried tofu with kale",
        snacks: "Mixed fruit bowl"
      },
      {
        breakfast: "Banana pancakes",
        lunch: "Baked falafel with couscous",
        dinner: "Paneer tikka with grilled zucchini",
        snacks: "Trail mix"
      },
      {
        breakfast: "Upma with veggies",
        lunch: "Vegetable biryani",
        dinner: "Chickpea stew with spinach",
        snacks: "Coconut water and dates"
      },
      {
        breakfast: "Idli with sambar",
        lunch: "Rajma chawal",
        dinner: "Stuffed paratha with curd",
        snacks: "Raisins and peanuts"
      }
    ];

    const saraMeals = [
      {
        breakfast: "Cornflakes with milk and banana",
        lunch: "Chicken salad wrap",
        dinner: "Fish curry with rice",
        snacks: "Fruit yogurt"
      },
      {
        breakfast: "Vegetable sandwich",
        lunch: "Paneer fried rice",
        dinner: "Lamb stew with chapati",
        snacks: "Buttermilk and biscuit"
      },
      {
        breakfast: "Wheat porridge",
        lunch: "Grilled tofu wrap",
        dinner: "Mushroom risotto",
        snacks: "Fruit smoothie"
      },
      {
        breakfast: "Masala oats",
        lunch: "Egg sandwich with salad",
        dinner: "Rice with lentils and ghee",
        snacks: "Dry fruits"
      },
      {
        breakfast: "Peanut butter toast",
        lunch: "Chicken noodles",
        dinner: "Veg stew and brown bread",
        snacks: "Boiled corn"
      },
      {
        breakfast: "Idiyappam with coconut milk",
        lunch: "Chapati with dal",
        dinner: "Pasta with spinach pesto",
        snacks: "Banana chips"
      },
      {
        breakfast: "Moong dal chilla",
        lunch: "Veg pulao",
        dinner: "Roti with palak paneer",
        snacks: "Lassi"
      }
    ];

    const qwertyMeals = [
      {
        breakfast: "Boiled eggs and toast",
        lunch: "Soya chunks curry with rice",
        dinner: "Chicken breast with grilled beans",
        snacks: "Greek yogurt"
      },
      {
        breakfast: "Milkshake and nuts",
        lunch: "Veg fried rice with egg",
        dinner: "Baked fish with salad",
        snacks: "Energy bar"
      },
      {
        breakfast: "Fruit salad with curd",
        lunch: "Chickpea quinoa salad",
        dinner: "Omelet and veggies",
        snacks: "Roasted peanuts"
      },
      {
        breakfast: "Egg dosa",
        lunch: "Rice with fish curry",
        dinner: "Tofu and beans stir-fry",
        snacks: "Low-fat cheese"
      },
      {
        breakfast: "Sprouts and toast",
        lunch: "Rajma with brown rice",
        dinner: "Chicken kebabs and salad",
        snacks: "Fruit bowl"
      },
      {
        breakfast: "Protein shake",
        lunch: "Vegetable korma with roti",
        dinner: "Beef curry and rice",
        snacks: "Dates and coconut slices"
      },
      {
        breakfast: "Khichdi with curd",
        lunch: "Paratha with chana masala",
        dinner: "Egg fried rice",
        snacks: "Dry figs and milk"
      }
    ];

    const generateWeeklyPlan = (mealSet) => {
      const weeks = [];
      for (let week = 1; week <= 3; week++) {
        const days = daysOfWeek.map((day, i) => ({
          day,
          meals: {
            breakfast: { item: mealSet[i].breakfast, calories: 480 },
            lunch: { item: mealSet[i].lunch, calories: 700 },
            dinner: { item: mealSet[i].dinner, calories: 800 },
            snacks: { item: mealSet[i].snacks, calories: 300 }
          }
        }));
        weeks.push({ week, days });
      }
      return weeks;
    };

    const newDietPlans = [
      {
        planName: "Vegan 2200 Cal Plan",
        caloriesPerDay: 2280,
        macros: { carbs: "55%", protein: "25%", fat: "20%" },
        durationWeeks: 3,
        weeklyPlan: generateWeeklyPlan(janeMeals),
        assignedTo: "jane_smith"
      },
      {
        planName: "Balanced 2400 Cal Plan",
        caloriesPerDay: 2400,
        macros: { carbs: "50%", protein: "30%", fat: "20%" },
        durationWeeks: 3,
        weeklyPlan: generateWeeklyPlan(saraMeals),
        assignedTo: "sara92"
      },
      {
        planName: "Fitness 2300 Cal Plan",
        caloriesPerDay: 2300,
        macros: { protein: "35%", carbs: "45%", fat: "20%" },
        durationWeeks: 3,
        weeklyPlan: generateWeeklyPlan(qwertyMeals),
        assignedTo: "qwerty"
      }
    ];

    await dietPlans.insertMany(newDietPlans);
    console.log("✅ Diet plans for 3 new users (3 weeks each) inserted.");
  } catch (err) {
    console.error("❌ Error inserting diet plans:", err);
  } finally {
    await client.close();
  }
}

insertMoreDietPlans();
