const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function generateCaption(fileBuffer, mimeType = 'image/jpeg') {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const base64Data = fileBuffer.toString('base64');
        
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        };
        
        // Prompt to get structured JSON response with 5 different caption styles
        const prompt = `
        You are a caption generator. Analyze this image and respond with ONLY a JSON object containing exactly 5 different captions.

        Required JSON format (respond with NOTHING else):
        {"caption":{"cpt1":"caption here","cpt2":"caption here","cpt3":"caption here","cpt4":"caption here","cpt5":"caption here"}}
        
        Caption styles:
        - cpt1: Fun and playful with emojis (under 150 chars)
        - cpt2: Simple and clean (under 150 chars)
        - cpt3: Mysterious or thought-provoking (under 150 chars)
        - cpt4: Descriptive and detailed (under 150 chars)
        - cpt5: Trendy social media style with hashtags (under 150 chars)
        
        IMPORTANT: Return ONLY the JSON object. No explanations, no markdown, no extra text.
        `;

        const result = await model.generateContent([
            prompt,
            imagePart,
        ]);
        
        const response = result.response;
        const responseText = response.text();
        
        console.log("Raw AI response:", responseText);

        // Clean the response text to extract only JSON
        let cleanedResponse = responseText.trim();
        
        // Remove markdown code blocks if present
        cleanedResponse = cleanedResponse.replace(/```json\s*/g, '');
        cleanedResponse = cleanedResponse.replace(/```\s*/g, '');
        
        // Extract JSON from the response (find content between first { and last })
        const firstBrace = cleanedResponse.indexOf('{');
        const lastBrace = cleanedResponse.lastIndexOf('}');
        
        if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
            cleanedResponse = cleanedResponse.substring(firstBrace, lastBrace + 1);
        }
        
        console.log("Cleaned response:", cleanedResponse);
        
        // Parse the cleaned JSON response
        const parsedResponse = JSON.parse(cleanedResponse);
        
        // Validate the structure
        if (parsedResponse.caption && 
            parsedResponse.caption.cpt1 && 
            parsedResponse.caption.cpt2 && 
            parsedResponse.caption.cpt3 && 
            parsedResponse.caption.cpt4 && 
            parsedResponse.caption.cpt5) {
            return parsedResponse;
        } else {
            throw new Error("Invalid response structure from AI");
        }
    } catch (error) {
        console.error("Error generating caption:", error.message);
        return "Failed to generate caption.";
    }
}

module.exports = generateCaption;