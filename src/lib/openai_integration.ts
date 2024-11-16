import OpenAI from "openai";

const openai: OpenAI = new OpenAI();

const SYSTEM_PROMPT = "You're an AI planning assistant for an astronaut on a space mission. The astronaut wants new, innovative ideas on how they can combine their provided foods in a interesting and delicious way. The astronaut has provided a list of foods they have and want to use as well as special instructions, if any. Try to make the recipe follow a general theme. You do not have to use all of the ingredients. Feel free to be a bit unorthodox in your meal planning. Keep in mind that it may not be possible to deconstruct the original ingredients of the provided foods. Remember that they are on a space mission, so consider those limitations.";

export async function generateRecipe(
    auth_token: string,
    ingredients: string[],
    specialInstructions: string = "No Special Instructions"
): Promise<string> {
    // todo: authenticate user with the auth_token to make sure they have access to the API

    const prompt = SYSTEM_PROMPT
        .replace("${INGREDIENTS}", ingredients.join("\n"))
        .replace("${SPECIAL_INSTRUCTIONS}", specialInstructions);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: prompt
            },
            {
                role: "user",
                content: `Generate a recipe using the following ingredients: ${ingredients.join(", ")} and special instructions: ${specialInstructions}. Format your recipe in markdown by placing the ingredients in a bulleted list and the instructions in a numbered list.`
            },
        ],
    });

    return completion.choices[0].message.content ?? "The recipe failed to generate.";
}