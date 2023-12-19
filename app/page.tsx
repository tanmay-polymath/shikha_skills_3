'use client'

import { useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { Skills, Analysis,Tag } from "./utils/types";

import SkillTag from "./components/SkillTag";
import { FileStack } from "lucide-react";

export default function Home() {

  const textRef = useRef<HTMLTextAreaElement>(null);
  const [loading,setLoading] = useState<boolean>(false)
  const [currSkills,setCurrSkills] = useState<Analysis | null>(null)
  const [filterSkills,setFilterSkills] = useState<Analysis | null>(null)
  const [filterSelect,setFilterSelect] = useState<boolean>(false)

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
          tags: [...anaRes[1].split(`\"skills\":`)[1].split(`\"explanation\":`)[0].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1])
              }
            })
            .filter((val) => (val.score && val.score > 0)),
            explanation: anaRes[1].split(`\"skills\":`)[1].split(`\"explanation\":`)[1].trim()
        },
        Collaboration: {
          score: "0",
          tags: [...anaRes[4].split(`\"skills\":`)[1].split(`\"explanation\":`)[0].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1])
              }
            })
            .filter((val) => (val.score && val.score > 0)),
            explanation: anaRes[4].split(`\"skills\":`)[1].split(`\"explanation\":`)[1].trim()
        },
        Communication: {
          score: "0",
          tags: [...anaRes[3].split(`\"skills\":`)[1].split(`\"explanation\":`)[0].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1])
              }
            })
            .filter((val) => (val.score && val.score > 0)),
            explanation: anaRes[3].split(`\"skills\":`)[1].split(`\"explanation\":`)[1].trim()
        },
        Creativity: {
          score: "0",
          tags: [...anaRes[2].split(`\"skills\":`)[1].split(`\"explanation\":`)[0].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1])
              }
            })
            .filter((val) => (val.score && val.score > 0)),
            explanation: anaRes[2].split(`\"skills\":`)[1].split(`\"explanation\":`)[1].trim()
        },
        CriticalThinking: {
          score: "0",
          tags: [...anaRes[0].split(`\"skills\":`)[1].split(`\"explanation\":`)[0].trim().replace(/\[|\]/g,'').split(',')]
                .filter((val) => val.trim().length > 5)
                .map((val) => {
                  const t = val.trim().split(":")

                  return {
                    name: t[0],
                    score: parseInt(t[1])
                  }
                })
                .filter((val) => (val.score && val.score > 0)),
                explanation: anaRes[0].split(`\"skills\":`)[1].split(`\"explanation\":`)[1].trim()
        },
        Character: {
          score: "0",
          tags: [...anaRes[5].split(`\"skills\":`)[1].split(`\"explanation\":`)[0].trim().replace(/\[|\]/g,'').split(',')]
              .filter((val) => val.trim().length > 5)
              .map((val) => {
                const t = val.trim().split(":")

                return {
                  name: t[0],
                  score: parseInt(t[1])
                }
              })
              .filter((val) => (val.score && val.score > 0)),
              explanation: anaRes[5].split(`\"skills\":`)[1].split(`\"explanation\":`)[1].trim()
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
      setFilterSkills(obj)
      setCurrSkills(obj);

    } catch (error) {
      console.log("Error !!");
      console.log(error);
      setLoading(false)
      setCurrSkills(null)
      setFilterSkills(null)
    }
  }

  const filterTags = () => {

    // setLoading(true)

    const newObj: Analysis = {
      Character: {
        ...currSkills!.Character,
        tags: currSkills!.Character.tags.filter((val:Tag) => val.score >= 90)
      },
      Cognitive: {
        ...currSkills!.Cognitive,
        tags: currSkills!.Cognitive.tags.filter((val:Tag) => val.score >= 90)
      },
      Collaboration: {
        ...currSkills!.Collaboration,
        tags: currSkills!.Collaboration.tags.filter((val:Tag) => val.score >= 90)
      },
      Communication: {
        ...currSkills!.Communication,
        tags: currSkills!.Communication.tags.filter((val:Tag) => val.score >= 90)
      },
      Creativity: {
        ...currSkills!.Creativity,
        tags: currSkills!.Creativity.tags.filter((val:Tag) => val.score >= 90)
      },
      CriticalThinking: {
        ...currSkills!.CriticalThinking,
        tags: currSkills!.CriticalThinking.tags.filter((val:Tag) => val.score >= 90)
      }
    }

    setFilterSkills(newObj)
  }

  const toggle = () => {
    console.log("toggled");
    setFilterSelect((prev) => !prev)

    if(!filterSelect){
      filterTags()
    }

    if(filterSelect){
      setFilterSkills(currSkills)
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
          (Ver 2.0)
        </h2>
        <textarea ref = {textRef} className = "rounded-md"/>
        <button
          className = "mt-3 mb-6 rounded-md bg-black px-5 py-1.5 text-xl font-bold tracking-wide text-white hover:bg-slate-800"
          onClick = {checkHandler}
        >
          {loading? "Analysing...":"Analyse"}
        </button>
      </div>

      {filterSkills != null && 
        (<div className="w-full p-4 flex gap-4 mt-4 flex-col">
          {/* Switch */}
          <div className ="flex items-center justify-start">
            <label className ="relative inline-flex items-center cursor-pointer gap-3">
              <input type="checkbox" className="sr-only peer"  onChange={toggle}/>
              <span className ="border-2 border-solid border-black w-14 h-7 bg-white rounded-full peer-checked:bg-black peer-focus:outline-none peer-focus:ring peer-focus:ring-black dark:peer-focus:ring-white peer-focus:ring-opacity-50 after:absolute after:left-1 after:top-1 after:bg-black after:border-2 after:border-white after:h-5 after:w-5 after:rounded-full after:transition-transform peer-checked:after:translate-x-[27px] peer-checked:after:bg-white"></span>
              <p
                className = "text-xl font-semibold select-none"
              >
                {`Filter skills (score > 90)`}
              </p>
            </label>
          </div>
          <div
            className = "w-full bg-blue-300 text-blue-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Communication:`}
            </p>
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {filterSkills.Communication.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>
            <div>
              <p className = "font-bold mt-3">Explanation:&nbsp;&nbsp;</p>
              <p className = "font-medium">{`${filterSkills.Communication.explanation}`}</p>
            </div>
          </div>
          <div
            className = "w-full bg-green-300 text-green-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Creativity:`}
            </p>
            
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {filterSkills.Creativity.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>

            <div>
              <p className = "font-bold mt-3">Explanation:&nbsp;&nbsp;</p>
              <p className = "font-medium">{`${filterSkills.Creativity.explanation}`}</p>
            </div>
          </div>
          <div
            className = "w-full bg-red-300 text-red-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Critical Thinking:`}
            </p>
            
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {filterSkills.CriticalThinking.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>

            <div>
              <p className = "font-bold mt-3">Explanation:&nbsp;&nbsp;</p>
              <p className = "font-medium">{`${filterSkills.CriticalThinking.explanation}`}</p>
            </div>
          </div>
          <div
            className = "w-full bg-zinc-300 text-zinc-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Cognitive:`}
            </p>
            
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {filterSkills.Cognitive.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>

            <div>
              <p className = "font-bold mt-3">Explanation:&nbsp;&nbsp;</p>
              <p className = "font-medium">{`${filterSkills.Cognitive.explanation}`}</p>
            </div>
          </div>
          <div
            className = "w-full bg-pink-300 text-pink-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Collaboration:`}
            </p>
            
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {filterSkills.Collaboration.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>

            <div>
              <p className = "font-bold mt-3">Explanation:&nbsp;&nbsp;</p>
              <p className = "font-medium">{`${filterSkills.Collaboration.explanation}`}</p>
            </div>
          </div>
          <div
            className = "w-full bg-yellow-300 text-yellow-800 font-bold px-3 py-1 text-xl rounded-md"
          >
            <p>
              {`Character:`}
            </p>
            
            <div className = "mt-3 flex flex-wrap gap-3 items-center">
              <p className = "font-bold">Tags:&nbsp;&nbsp;</p>
              {filterSkills.Character.tags.map((val,i) => (
                <SkillTag skill={val} key = {i}/>
              ))}
            </div>

            <div>
              <p className = "font-bold mt-3">Explanation:&nbsp;&nbsp;</p>
              <p className = "font-medium">{`${filterSkills.Character.explanation}`}</p>
            </div>
          </div>
        </div>)
      }
    </main>
  )
}
