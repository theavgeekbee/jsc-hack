import OpenAI from "openai";

const openai: OpenAI = new OpenAI();

const PLAN_SYSTEM_PROMPT = "You are an assistant to an astronaut on a long mission. Design a detailed plan of activities for the duration of their mission. You'll be provided the duration of their mission. Each month in the mission should bring a new daily challenge for them to complete. Return your answer in JSON format using the following schema:\n" +
    "[{\"month\": ..., \"activity\": ...}, ...]\n" +
    "\n" +
    "Example:\n" +
    "[{\"month\": 1, \"activity\": \"Origami\"}, {\"month\": 2, \"activity\": \"Meditation for 30 minutes\"}]\n" +
    "\n" +
    "Do not put the result in a code block. Do not add any other text. Do not include new-line characters. Avoid using the activities listed in the example.";

const DAILY_CHALLENGE_SYSTEM_PROMPT = "You are an assistant to a group of astronauts on a long mission. Create a daily challenge for all of the astronauts to complete. Return your response in one line. Do not include any code blocks, formatting, other text, or new-line characters.";

export async function generatePlan(
    mission_duration: number
): Promise<string> {
    // todo: authenticate user with the auth_token to make sure they have access to the API

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: PLAN_SYSTEM_PROMPT
            },
            {
                role: "user",
                content: `The astronaut's mission will last ${mission_duration} months.`
            },
        ],
    });

    return completion.choices[0].message.content ?? "Failed to generate plan, try again later.";
}

export async function generateDailyChallenge(): Promise<string> {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: DAILY_CHALLENGE_SYSTEM_PROMPT
            },
        ],
    });

    return completion.choices[0].message.content ?? "Failed to generate daily challenge, try again later.";
}