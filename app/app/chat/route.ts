import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY || ""
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.GROQ_API_KEY) {
            return new Response(
                JSON.stringify({
                    error: "Groq API key not configured. Please add GROQ_API_KEY to your .env.local file."
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const result = streamText({
            model: groq("llama-3.3-70b-versatile"),
            messages
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error("Chat API error:", error);

        return new Response(
            JSON.stringify({
                error: error?.message || "Failed to process chat request. Please try again."
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
