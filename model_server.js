const fs = require("fs");
const csv = require("csv-parser");

const meals = [];

fs.createReadStream("/Users/varunnihar/Downloads/Menu-data.csv")
  .pipe(csv())
  .on("data", (row) => meals.push(row))
  .on("end", () => {
    console.log(meals); // Array of objects
  });

meals_json = df.to_dict(orient="records") 

const prompt = `
You are an AI nutritionist. Based on the user's needs, recommend a meal from the provided database.

User Info:
- Goal: Bulking
- Target Calories: 3000 kcal
- Allergies: Peanuts
- Meal Type: Lunch

Meal Database:
${JSON.stringify(meals, null, 2)}

Return the meal in this JSON format:
{
  "meal": {
    "name": "Grilled Chicken with Quinoa",
    "ingredients": ["Chicken breast", "Quinoa", "Broccoli"],
    "calories": 600,
    "macros": {
      "protein": 50,
      "carbs": 60,
      "fats": 10
    }
  }
}
`;

const axios = require("axios");

async function getMealRecommendation(prompt) {
    const response = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3",
        prompt: prompt,
        stream: false
    });

    return response.data;
}

getMealRecommendation(prompt).then(console.log);

