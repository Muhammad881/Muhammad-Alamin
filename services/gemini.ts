
import { GoogleGenAI } from "@google/genai";

// Strictly following @google/genai guidelines for model interaction and initialization
export const geminiService = {
  generateMenuDescription: async (itemName: string, category: string) => {
    // Create a new GoogleGenAI instance right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a appetizing and concise 2-sentence description for a restaurant menu item called "${itemName}" in the "${category}" category.`,
      });
      // Access text as a property, not a method
      return response.text?.trim() || "Delicious chef-crafted dish.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An exquisite culinary creation.";
    }
  },

  generateReviewResponse: async (customerName: string, message: string) => {
    // Create a new GoogleGenAI instance right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `As the manager of "Good Platters", write a friendly and professional response to this customer message from ${customerName}: "${message}"`,
      });
      // Access text as a property, not a method
      return response.text?.trim() || "Thank you for reaching out!";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Thank you for your feedback. We look forward to serving you again!";
    }
  }
};
