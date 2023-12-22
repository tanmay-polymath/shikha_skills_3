import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { CriticalThinking, Communication, Creativity, Cognitive, Collaboration, Character } from "@/app/utils/data"

// export const dynamic = "force-dynamic"
export const runtime = "edge"

export async function POST(request: NextRequest) {
  try {
    console.log("openai api hit")
    const body = await request.json()

    const mssg: string = body.message
    const reqSkill: string = body.skill

    const openai = new OpenAI({
      apiKey: `${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
    })

    // console.log(reqSkill);
    // console.log(`${(reqSkill == "CriticalThinking")? CriticalThinking.skill_name: reqSkill == "Communication"? Communication.skill_name: reqSkill == "Creativity"? Creativity.skill_name: reqSkill == "Cognitive"? Cognitive.skill_name: reqSkill == "Collaboration"? Collaboration.skill_name: Character.skill_name}`);

    const currSkillObj = (reqSkill == "CriticalThinking")? CriticalThinking: reqSkill == "Communication"? Communication: reqSkill == "Creativity"? Creativity: reqSkill == "Cognitive"? Cognitive: reqSkill == "Collaboration"? Collaboration: Character

    // console.log(`${currSkillObj["sub skills"]}`);
    // console.log("------------------------------------------------------------");
    // console.log(currSkillObj.skill_name);
    // currSkillObj["sub skills"].forEach((val) => {console.log(val)})

    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: "You are an expert Teaching assistant",
        },
        // {
        //   role: "user",
        //   content: `Forget about any previous data. A list of skills is provided below enclosed in triple quotes.
        //   '''${currSkillObj["sub skills"].map(val => `skill name: ${val["skill name"]}\nskill explanation: ${val.explanation}`)}'''
        //   Understand the provided skills and return a series of comma separated names of all the skills provided. The response should only contain the skill names.
        //   `,
        // },
        {
          role: "user",
          content: `Forget about any previous data. You are provided a list of skills below enclosed in triple quotes
          '''${currSkillObj["sub skills"].map(val => `${val["skill name"]}`)}'''
          You have to go through each skill thoroughly and understand each skill. Later you will be provided an assignment description, you have to check the presence of each skill in the assignment description and return the names of all the skills along with a \"presence_score\" for each skill, from the array of skills provided above that are present in the assignment description. The \"presence_score\" that was mentioned previously is a confidence score out of 100 given to each skill which signifies how strongly that skill is present.  The response should be a comma separated series of the skill name's along with their \"presence_score\" of the skills that are present in the assignment. The response should not contain any explanation or any other random skill name that is not present in the array of provided skills.
          The response should strictly be in the following format:-
          \"skills\": skill_name_1:presence_score_1,skill_name_2:presence_score_2,skill_name_3:presence_score_3,skill_name_4:presence_score_4
          `,
        },
        // {
        //     role: "user",
        //     content: `
        //     ${currSkillObj["sub skills"].map(val => `skill name: ${val["skill name"]}\nskill explanation: ${val.explanation}`)}
        //     `,
        // },
        {
            role: "user",
            content: `I am just describing the project`
        },
        {
            role: "assistant",
            content: '\"skills\": '
        },
        {
            role: "user",
            content: `I have come up with a new realtime chat application`
        },
        {
            role: "assistant",
            content: `\"skills\": ${reqSkill == "CriticalThinking"? "Problem and Context:32, Goal or purpose:49": reqSkill == "Communication"? "": reqSkill == "Creativity"? "Tinkering:81, Risk Taking:22, Nonlinear Thinking:57, Originality:93": reqSkill == "Cognitive"? "Abstract Thinking: 31, Literacy:88": reqSkill == "Collaboration"? "": ""}`
        },
        {
            role: "user",
            content: `Pioneered the implementation of this system, leading to 100% elimination of paper usage. Drove the entire front-end development, including 100% implementation of QR Code interface. Orchestrated a collaborative effort among a team of 3 student, hence maximizing productivity.`
        },
        {
            role: "assistant",
            content: `\"skills\": ${reqSkill == "CriticalThinking"? "Problem and Context:91, Goal or purpose:82,Definitions and assumptions:99, Key factors or parameters:72, Pattern recognition:23, Systems thinking:83, Structural Understanding:77, Reliability:11, Strength of Evidence:47": reqSkill == "Communication"? "Domain specific vocabulary:19, Sentence and paragraph structures:13, Clarity and conciseness:65, Active Listening:1, Etiquette:7, Enjoyment:5": reqSkill == "Creativity"? "Tinkering:78, Flexibility:33, Risk Taking:11, Nonlinear Thinking:89, Originality:99, Making Connections:1": reqSkill == "Cognitive"? "Memory:3, Chunking:11, Perception and Awareness:51, Logic and Algorithmic Thinking:61, Abstract Thinking:67, Literacy:76": reqSkill == "Collaboration"? "Trust:12, Fairness:75, Leadership:95, Norms and Processes:93, Shared goals:86, Task Delegation:81, Deliberation:83": "Curiosity:70, Responsibility:83, Purpose and Goals:79, Excellence:88, Task Initiation:91, Growth Mindset:91, Honesty:88"}`
        },
        {
            role: "user",
            content: `assignment description: ${mssg}`
        }
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