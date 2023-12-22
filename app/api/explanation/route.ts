import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// export const dynamic = "force-dynamic"
export const runtime = "edge"

export async function POST(request: NextRequest) {
  try {
    console.log("openai explain api hit")
    const body = await request.json()

    console.log(body);

    const mssg: string = body.message
    const reqSkill: string = body.skill

    const openai = new OpenAI({
      apiKey: `${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
    })

    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // temperature: 0.3,
      messages: [
        {
          role: "system",
          content: "You are an expert Teaching assistant",
        },
        {
          role: "user",
          content: `Forget about any previous data. You are provided an assignment description enclosed in triple quotes '''${mssg}'''. It is said that the skill of \"${reqSkill}\" is present in the assignment. You have to give a short and comprehenive explanation explaining the presence of \"${reqSkill}\" skill in the assignment. Your explanation should be short, comprehensive and should take references from the assignment description to support the claims. Make sure to keep your explanation short and crisp.
          `,
        },
      ],
    })

    // console.log(res)

    return new Response(
      JSON.stringify({
        success: true,
        message: res.choices[0].message.content,
      })
    )
  } catch (error: any) {
    console.log(error)

    return new NextResponse(
      JSON.stringify({
        message: error.message,
        success: false,
      })
    )
  }
}