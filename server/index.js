import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const openai = new OpenAI({
    organization: "org-8P7uULeGqc8hw0c0WxGNjfv2",
    apiKey: 'sk-proj-lZlFKYJ96oND4BVIR9hjT3BlbkFJRpcCNKFv0V7Zh7SLDtH0'
});


app.use(cors());
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    console.log("Hello World");
    res.json({"asfd":"ads"});
})


function parseOpenAIResponse(jsonString) {
    console.log(jsonString)
    const data = JSON.parse(jsonString);
  
    const parsedData = {
      overallEvaluation: {
        productName: data["Overall Evaluation"]["Punny Product Name of Mix"],
        flavorScore: data["Overall Evaluation"]["Flavor Profile Score"],
        healthScore: data["Overall Evaluation"]["Health Benefits Score"],
        summary: data["Overall Evaluation"]["Short Summarizing Evaluation"]
      },
      useCases: data["Example Product Use Cases"]["Use Cases of Mix"],
      suitableDiets: data["Dietary Suitability"]["Suitable for (e.g., vegan, gluten-free)"],
      healthBenefits: data["Health and Wellness Benefits"]["List of Health Benefits"]
    };
  
    return parsedData;
}


app.post('/api/evaluate', async (req, res) => {
    const { ingredients } = req.body;
  
    try {
        const userPrompt = {
            prompt: `Evaluate the blend of ${ingredients.join(', ')} to json`,
            sections: [
              {
                title: "Overall Evaluation",
                items: [
                  { name: "Punny Product Name of Mix", value: "[name]"},
                  { name: "Flavor Profile Score", value: "[score]" },
                  { name: "Health Benefits Score", value: "[score]" },
                  { name: "Short Summarizing Evaluation", value: "[evaluation]" }
                ]
              },
              {
                title: "Example Product Use Cases",
                items: [
                    { name: "Use Cases of Mix", value: "[list of potential products]" }

                ]
              },
              {
                title: "Dietary Suitability",
                items: [
                  { name: "Suitable for (e.g., vegan, gluten-free)", value: "[list of suitable diets]" }
                ]
              },
              {
                title: "Health and Wellness Benefits",
                items: [
                  { name: "List of Health Benefits", value: "[list of health benefits]" }
                ]
              }
            ]
          };

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        response_format: {"type": "json_object"},
        messages: [
            {role: "system", content: JSON.stringify(userPrompt), content_type: 'application/json'},
        ],
        max_tokens: 400,
        temperature: 0.7
      });

      console.log(response);
  
      const evaluation = response.choices[0].message;
      const parsedEvaluation = parseOpenAIResponse(evaluation.content)
      res.json({ evaluation : parsedEvaluation });
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Error fetching evaluation from OpenAI' });
    }
});

app.post('/api/test/evaluate', async (req, res) => {
    const { ingredients } = req.body;
    const TESTING =  "{\n  \"Overall Evaluation\": {\n    \"Punny Product Name of Mix\": \"BerryGood Protein Boost\",\n    \"Flavor Profile Score\": 7.5,\n    \"Health Benefits Score\": 8.5,\n    \"Dietary Suitability\": \"High for non-dairy restricted diets\",\n    \"Short Summarizing Evaluation\": \"BerryGood Protein Boost combines the tangy sweetness of blueberries with the nutritional benefits of citrate and sodium caseinate, making it a solid choice for enhancing protein intake and overall health.\"\n  },\n  \"Example Product Use Cases\": {\n    \"Use Cases of Mix\": [\n      \"Protein shakes\",\n      \"Smoothie bowls\",\n      \"Yogurt toppings\",\n      \"Nutritious snacks\",\n      \"Post-workout recovery drinks\"\n    ]\n  },\n  \"Dietary Suitability\": {\n    \"Suitable for (e.g., vegan, gluten-free)\": [\n      \"Gluten-free\",\n      \"Low-carb\",\n      \"High-protein\",\n      \"Keto-friendly\"\n    ]\n  },\n  \"Health and Wellness Benefits\": {\n    \"List of Health Benefits\": [\n      \"Supports muscle repair and growth\",\n      \"Antioxidant properties from blueberry extract\",\n      \"Improves bone health through calcium content\",\n      \"Aids in digestion and nutrient absorption\"\n    ]\n  }\n}"

    const parsedEvaluation = parseOpenAIResponse(TESTING)
    res.json({ evaluation : parsedEvaluation });

});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});