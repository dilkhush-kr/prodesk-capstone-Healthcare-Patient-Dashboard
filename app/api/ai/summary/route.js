import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarize this health data in simple words:\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("AI RAW:", data);

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    return NextResponse.json({ result });

  } catch (error) {
    console.log("AI ERROR:", error);
    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    );
  }
}