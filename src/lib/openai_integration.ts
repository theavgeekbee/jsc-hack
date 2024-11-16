import OpenAI from "openai";

const openai: OpenAI = new OpenAI();

const SYSTEM_PROMPT = "You're an AI planning assistant for an astronaut on a space mission. The astronaut wants new, innovative ideas on how they can combine their provided foods in a interesting and delicious way. The astronaut has provided a list of foods they have and want to use as well as special instructions, if any. Try to make the recipe follow a general theme. You do not have to use all of the ingredients. Feel free to be a bit unorthodox in your meal planning. Keep in mind that it may not be possible to deconstruct the original ingredients of the provided foods. Remember that they are on a space mission, so they can only combine foods and cook them.\n" +
    "\n" +
    "Ingredients:\n" +
    "${INGREDIENTS}\n" +
    "\n" +
    "Special Instructions:\n" +
    "${SPECIAL_INSTRUCTIONS}";

export async function generateRecipe(ingredients: string[], specialInstructions: string = "No Special Instructions"): Promise<string> {
    const prompt = SYSTEM_PROMPT
        .replace("${INGREDIENTS}", ingredients.join("\n"))
        .replace("${SPECIAL_INSTRUCTIONS}", specialInstructions);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {role: "system", content: prompt},
            {
                role: "user",
                content: "Given the ingredients and instructions, print out the recipe. Format it in markdown, with the ingredients in a bulleted list at the top and then followed by a detailed set of instructions.",
            },
        ],
    });

    return completion.choices[0].message.content ?? "The recipe failed to generate.";
}