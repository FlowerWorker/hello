// app/api/improve-proposal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { text, tone, task } = await req.json();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant. ${task}. Use a ${tone} tone.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
  });

  const improvedText = completion.choices[0].message.content;
  return NextResponse.json({ improvedText });
}
