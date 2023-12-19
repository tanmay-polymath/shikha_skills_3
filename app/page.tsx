'use client'

import { useRef, useState } from "react"

import { Skills, Analysis,Tag } from "./utils/types";

import SkillTag from "./components/SkillTag";

export default function Home() {

  const textRef = useRef<HTMLTextAreaElement>(null);
  const [loading,setLoading] = useState<boolean>(false)
  const [currSkills,setCurrSkills] = useState<Analysis | null>(null)

  const checkHandler = async () => {
    try {
      
      const data = textRef.current!.value.trim();

      if(data.length == 0)
        return;

      setLoading(true)

      const apiRes = await Promise.all([
        //0
        // fetch("/api/analyse",{
        //   method: 'post',
        //   body: JSON.stringify({
        //     message: data,
        //     skill: "CriticalThinking"
        //   })
        // }),
        // //1
        // fetch("/api/analyse",{
        //   method: 'post',
        //   body: JSON.stringify({
        //     message: data,
        //     skill: "Cognitive"
        //   })
        // }),
        // //2
        // fetch("/api/analyse",{
        //   method: 'post',
        //   body: JSON.stringify({
        //     message: data,
        //     skill: "Creativity"
        //   })
        // }),
        // //3
        // fetch("/api/analyse",{
        //   method: 'post',
        //   body: JSON.stringify({
        //     message: data,
        //     skill: "Communication"
        //   })
        // }),
        // //4
        // fetch("/api/analyse",{
        //   method: 'post',
        //   body: JSON.stringify({
        //     message: data,
        //     skill: "Collaboration"
        //   })
        // }),
        // //5
        // fetch("/api/analyse",{
        //   method: 'post',
        //   body: JSON.stringify({
        //     message: data,
        //     skill: "Character"
        //   })
        // }),
        //6
        fetch("/api/getSubskills",{
          method: 'post',
          body: JSON.stringify({
            message: data,
            skill: "CriticalThinking"
          })
        }),
        //7
        fetch("/api/getSubskills",{
          method: 'post',
          body: JSON.stringify({
            message: data,
            skill: "Cognitive"
          })
        }),
        //8
        fetch("/api/getSubskills",{
          method: 'post',
          body: JSON.stringify({
            message: data,
            skill: "Creativity"
          })
        }),
        //9
        fetch("/api/getSubskills",{
          method: 'post',
          body: JSON.stringify({
            message: data,
            skill: "Communication"
          })
        }),
        //10
        fetch("/api/getSubskills",{
          method: 'post',
          body: JSON.stringify({
            message: data,
            skill: "Collaboration"
          })
        }),
        //11
        fetch("/api/getSubskills",{
          method: 'post',
          body: JSON.stringify({
            message: data,
            skill: "Character"
          })
        }),
      ])
  
      setLoading(false)

      const anaRes: string[] = []

      for(let i = 0 ; i < 6 ; i++){

        const temp = await apiRes[i].json();

        if(!temp.success){
          setCurrSkills(null);
          return;
        }

        anaRes.push(temp.message)
      }

      console.log(anaRes);

      const obj: Analysis = {
        Cognitive: {
          score: "0",
          tags: [...anaRes[1].split(`skills:`)[1].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1])
              }
            })
            .filter((val) => (val.score && val.score > 0))
        },
        Collaboration: {
          score: "0",
          tags: [...anaRes[4].split(`skills:`)[1].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1])
              }
            })
            .filter((val) => (val.score && val.score > 0))
        },
        Communication: {
          score: "0",
          tags: [...anaRes[3].split(`skills:`)[1].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1])
              }
            })
            .filter((val) => (val.score && val.score > 0))
        },
        Creativity: {
          score: "0",
          tags: [...anaRes[2].split(`skills:`)[1].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1])
              }
            })
            .filter((val) => (val.score && val.score > 0))
        },
        CriticalThinking: {
          score: "0",
          tags: [...anaRes[0].split(`skills:`)[1].trim().replace(/\[|\]/g,'').split(',')]
                .filter((val) => val.trim().length > 5)
                .map((val) => {
                  const t = val.trim().split(":")

                  return {
                    name: t[0],
                    score: parseInt(t[1])
                  }
                })
                .filter((val) => (val.score && val.score > 0))
        },
        Character: {
          score: "0",
          tags: [...anaRes[5].split(`skills:`)[1].trim().replace(/\[|\]/g,'').split(',')]
              .filter((val) => val.trim().length > 5)
              .map((val) => {
                const t = val.trim().split(":")

                return {
                  name: t[0],
                  score: parseInt(t[1])
                }
              })
              .filter((val) => (val.score && val.score > 0))
        }
      }

      // Sorting
      obj.Character.tags.sort((a:Tag,b:Tag) => {
        return (a.score > b.score)? -1:1;
      })
      
      obj.Communication.tags.sort((a:Tag,b:Tag) => {
        return (a.score > b.score)? -1:1;
      })
      
      obj.Creativity.tags.sort((a:Tag,b:Tag) => {
        return (a.score > b.score)? -1:1;
      })
      
      obj.CriticalThinking.tags.sort((a:Tag,b:Tag) => {
        return (a.score > b.score)? -1:1;
      })
      
      obj.Cognitive.tags.sort((a:Tag,b:Tag) => {
        return (a.score > b.score)? -1:1;
      })
      
      obj.Collaboration.tags.sort((a:Tag,b:Tag) => {
        return (a.score > b.score)? -1:1;
      })
      

      console.log(obj);
      setCurrSkills(obj);

    } catch (error) {
      console.log("Error !!");
      console.log(error);
      setLoading(false)
      setCurrSkills(null)
    }
  }

  return (
    <main className = "w-full p-4">
      <div className = "flex flex-col">
        <h1 
          className = "text-center text-2xl font-bold"
        >
          Skill Assessment
        </h1>
        <h2 
          className = "text-center text-xl font-bold mb-7"
        >
          (without skill description)
        </h2>
        <textarea ref = {textRef} className = "rounded-md"/>
        <button
          className = "mt-3 rounded-md bg-black px-5 py-1.5 text-xl font-bold tracking-wide text-white hover:bg-slate-800"
          onClick = {checkHandler}
        >
          {loading? "Analysing...":"Analyse"}
        </button>
      </div>
      {currSkills != null && 
        (<div className="w-full p-4 flex gap-4 mt-4 flex-col">
          <div
            className = "w-full bg-blue-300 text-blue-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Communication:`}
            </p>
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {currSkills.Communication.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>
            {/* <p className = "mt-3">
              <strong>Tags:&nbsp;&nbsp;</strong>
              {currSkills.Communication.tags.map((val,i) => (
                <span key = {i}>{`${val}, `}</span>
              ))}
            </p> */}
          </div>
          <div
            className = "w-full bg-green-300 text-green-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Creativity:`}
            </p>
            {/* <p>
              {`Creativity: ${currSkills?.Creativity.score}`}
            </p> */}
            {/* <p className = "mt-3">
              <strong>Tags:&nbsp;&nbsp;</strong>
              {currSkills.Creativity.tags.map((val,i) => (
                <span key = {i}>{`${val}, `}</span>
              ))}
            </p> */}
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {currSkills.Creativity.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>
          </div>
          <div
            className = "w-full bg-red-300 text-red-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Critical Thinking:`}
            </p>
            {/* <p>
              {`Critical Thinking: ${currSkills?.CriticalThinking.score}`}
            </p> */}
            {/* <p className = "mt-3">
              <strong>Tags:&nbsp;&nbsp;</strong>
              {currSkills.CriticalThinking.tags.map((val,i) => (
                <span key = {i}>{`${val}, `}</span>
              ))}
            </p> */}
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {currSkills.CriticalThinking.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>
          </div>
          <div
            className = "w-full bg-zinc-300 text-zinc-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Cognitive:`}
            </p>
            {/* <p>
              {`Cognitive: ${currSkills?.Cognitive.score}`}
            </p> */}
            {/* <p className = "mt-3">
              <strong>Tags:&nbsp;&nbsp;</strong>
              {currSkills.Cognitive.tags.map((val,i) => (
                <span key = {i}>{`${val}, `}</span>
              ))}
            </p> */}
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {currSkills.Cognitive.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>
          </div>
          <div
            className = "w-full bg-pink-300 text-pink-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Collaboration:`}
            </p>
            {/* <p>
              {`Collaboration: ${currSkills?.Collaboration.score}`}
            </p> */}
            {/* <p className = "mt-3">
              <strong>Tags:&nbsp;&nbsp;</strong>
              {currSkills.Collaboration.tags.map((val,i) => (
                <span key = {i}>{`${val}, `}</span>
              ))}
            </p> */}
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {currSkills.Collaboration.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>
          </div>
          <div
            className = "w-full bg-yellow-300 text-yellow-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Character:`}
            </p>
            {/* <p>
              {`Character: ${currSkills?.Character.score}`}
            </p> */}
            {/* <p className = "mt-3">
              <strong>Tags:&nbsp;&nbsp;</strong>
              {currSkills.Character.tags.map((val,i) => (
                <span key = {i}>{`${val}, `}</span>
              ))}
            </p> */}
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {currSkills.Character.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>
          </div>
        </div>)
      }
    </main>
  )
}
