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

  // console.log(currSkills);

  const filterTags = (obj?: Analysis) => {

    // setLoading(true)
    let newObj: Analysis

    newObj = {
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

  const fetchExplanation = async (obj:Analysis) => {
    try {

      const desc = textRef.current!.value.trim()

      setLoading(true)

      const criticalThinkingArr = obj.CriticalThinking.tags
      const communicationArr = obj.Communication.tags
      const creativityArr = obj.Creativity.tags
      const cognitiveArr = obj.Cognitive.tags
      const collaborationArr = obj.Collaboration.tags
      const characterArr = obj.Character.tags

      // crictical thinking
      const ctRes = await Promise.all(criticalThinkingArr.map((val:Tag) => {
        return fetch("/api/explanation",{
          method: "post",
          body: JSON.stringify({
            message: desc,
            skill: val.name
          })
        })
      }))

      let len = criticalThinkingArr.length

      for(let i = 0 ; i < len ; i++){
        const tData = await ctRes[i].json();

        obj.CriticalThinking.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // communication
      const commRes = await Promise.all(communicationArr.map((val:Tag) => {
        return fetch("/api/explanation",{
          method: "post",
          body: JSON.stringify({
            message: desc,
            skill: val.name
          })
        })
      }))

      len = communicationArr.length

      for(let i = 0 ; i < len ; i++){
        const tData = await commRes[i].json();

        obj.Communication.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // creativity
      const crtRes = await Promise.all(creativityArr.map((val:Tag) => {
        return fetch("/api/explanation",{
          method: "post",
          body: JSON.stringify({
            message: desc,
            skill: val.name
          })
        })
      }))

      len = creativityArr.length

      for(let i = 0 ; i < len ; i++){
        const tData = await crtRes[i].json();

        obj.Creativity.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // cognitive
      const cogRes = await Promise.all(cognitiveArr.map((val:Tag) => {
        return fetch("/api/explanation",{
          method: "post",
          body: JSON.stringify({
            message: desc,
            skill: val.name
          })
        })
      }))

      len = cognitiveArr.length

      for(let i = 0 ; i < len ; i++){
        const tData = await cogRes[i].json();

        obj.Cognitive.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // collaboration
      const colabRes = await Promise.all(collaborationArr.map((val:Tag) => {
        return fetch("/api/explanation",{
          method: "post",
          body: JSON.stringify({
            message: desc,
            skill: val.name
          })
        })
      }))

      len = collaborationArr.length

      for(let i = 0 ; i < len ; i++){
        const tData = await colabRes[i].json();

        obj.Collaboration.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // character
      const chrRes = await Promise.all(characterArr.map((val:Tag) => {
        return fetch("/api/explanation",{
          method: "post",
          body: JSON.stringify({
            message: desc,
            skill: val.name
          })
        })
      }))

      len = characterArr.length

      for(let i = 0 ; i < len ; i++){
        const tData = await chrRes[i].json();
        
        obj.Character.tags[i].explanation = tData.message
      }

      setLoading(false)

      setCurrSkills(obj)
      // setFilterSkills(obj)

      const newObj: Analysis = (filterSelect)? {
        Character: {
          ...obj!.Character,
          tags: obj!.Character.tags.filter((val:Tag) => val.score >= 90)
        },
        Cognitive: {
          ...obj!.Cognitive,
          tags: obj!.Cognitive.tags.filter((val:Tag) => val.score >= 90)
        },
        Collaboration: {
          ...obj!.Collaboration,
          tags: obj!.Collaboration.tags.filter((val:Tag) => val.score >= 90)
        },
        Communication: {
          ...obj!.Communication,
          tags: obj!.Communication.tags.filter((val:Tag) => val.score >= 90)
        },
        Creativity: {
          ...obj!.Creativity,
          tags: obj!.Creativity.tags.filter((val:Tag) => val.score >= 90)
        },
        CriticalThinking: {
          ...obj!.CriticalThinking,
          tags: obj!.CriticalThinking.tags.filter((val:Tag) => val.score >= 90)
        }
      } : obj

      setFilterSkills(newObj)

    } catch (error) {
      setLoading(false)
      console.log("Error !!");
      console.log(error);
    }
  }

  const checkHandler = async () => {
    try {
      
      const data = textRef.current!.value.trim();

      if(data.length == 0)
        return;

      setLoading(true)

      const apiRes = await Promise.all([
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
          setFilterSkills(null)
          return;
        }

        anaRes.push(temp.message)
      }

      console.log(anaRes);

      const obj: Analysis = {
        Cognitive: {
          score: "0",
          tags: [...anaRes[1].split(`\"skills\":`)[1].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: ""
              }
            })
            .filter((val) => (val.score && val.score > 0)),
        },
        Collaboration: {
          score: "0",
          tags: [...anaRes[4].split(`\"skills\":`)[1].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: ""
              }
            })
            .filter((val) => (val.score && val.score > 0)),
        },
        Communication: {
          score: "0",
          tags: [...anaRes[3].split(`\"skills\":`)[1].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: ""
              }
            })
            .filter((val) => (val.score && val.score > 0)),
        },
        Creativity: {
          score: "0",
          tags: [...anaRes[2].split(`\"skills\":`)[1].trim().replace(/\[|\]/g,'').split(',')]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: ""
              }
            })
            .filter((val) => (val.score && val.score > 0)),
        },
        CriticalThinking: {
          score: "0",
          tags: [...anaRes[0].split(`\"skills\":`)[1].trim().replace(/\[|\]/g,'').split(',')]
                .filter((val) => val.trim().length > 5)
                .map((val) => {
                  const t = val.trim().split(":")

                  return {
                    name: t[0],
                    score: parseInt(t[1]),
                    explanation: ""
                  }
                })
                .filter((val) => (val.score && val.score > 0)),
        },
        Character: {
          score: "0",
          tags: [...anaRes[5].split(`\"skills\":`)[1].trim().replace(/\[|\]/g,'').split(',')]
              .filter((val) => val.trim().length > 5)
              .map((val) => {
                const t = val.trim().split(":")

                return {
                  name: t[0],
                  score: parseInt(t[1]),
                  explanation: ""
                }
              })
              .filter((val) => (val.score && val.score > 0)),
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
      

      console.log("Tags");
      console.log(obj);
      // setFilterSkills(obj)
      setCurrSkills(obj);

      const newObj: Analysis = (filterSelect)? {
        Character: {
          ...obj!.Character,
          tags: obj!.Character.tags.filter((val:Tag) => val.score >= 90)
        },
        Cognitive: {
          ...obj!.Cognitive,
          tags: obj!.Cognitive.tags.filter((val:Tag) => val.score >= 90)
        },
        Collaboration: {
          ...obj!.Collaboration,
          tags: obj!.Collaboration.tags.filter((val:Tag) => val.score >= 90)
        },
        Communication: {
          ...obj!.Communication,
          tags: obj!.Communication.tags.filter((val:Tag) => val.score >= 90)
        },
        Creativity: {
          ...obj!.Creativity,
          tags: obj!.Creativity.tags.filter((val:Tag) => val.score >= 90)
        },
        CriticalThinking: {
          ...obj!.CriticalThinking,
          tags: obj!.CriticalThinking.tags.filter((val:Tag) => val.score >= 90)
        }
      } : obj

      setFilterSkills(newObj)

      fetchExplanation(obj)

    } catch (error) {
      console.log("Error !!");
      console.log(error);
      setLoading(false)
      setCurrSkills(null)
      setFilterSkills(null)
    }
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
          {filterSkills.Communication.tags.length > 0 && <div
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
              {filterSkills.Communication.tags.map((tval:Tag) => {
                return (
                  <p className = "font-medium border-2 border-solid border-blue-800 rounded-md p-2 mt-2">
                    <span className = "font-semibold">{`${tval.name}`}:&nbsp;&nbsp;</span>
                    {tval.explanation == ""? "loading...":tval.explanation}
                  </p>
                )
              })}
            </div>
          </div>}
          {filterSkills.Creativity.tags.length > 0 && <div
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
              {filterSkills.Creativity.tags.map((tval:Tag) => {
                return (
                  <p className = "font-medium border-2 border-solid border-green-800 rounded-md p-2 mt-2">
                    <span className = "font-semibold">{`${tval.name}`}:&nbsp;&nbsp;</span>
                    {tval.explanation == ""? "loading...":tval.explanation}
                  </p>
                )
              })}
            </div>
          </div>}
          {filterSkills.CriticalThinking.tags.length > 0 && <div
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
              {filterSkills.CriticalThinking.tags.map((tval:Tag) => {
                return (
                  <p className = "font-medium border-2 border-solid border-red-800 rounded-md p-2 mt-2">
                    <span className = "font-semibold">{`${tval.name}`}:&nbsp;&nbsp;</span>
                    {tval.explanation == ""? "loading...":tval.explanation}
                  </p>
                )
              })}
            </div>
          </div>}
          {filterSkills.Cognitive.tags.length > 0 && <div
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
              {filterSkills.Cognitive.tags.map((tval:Tag) => {
                return (
                  <p className = "font-medium border-2 border-solid border-zinc-800 rounded-md p-2 mt-2">
                    <span className = "font-semibold">{`${tval.name}`}:&nbsp;&nbsp;</span>
                    {tval.explanation == ""? "loading...":tval.explanation}
                  </p>
                )
              })}
            </div>
          </div>}
          {filterSkills.Collaboration.tags.length > 0 && <div
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
              {filterSkills.Collaboration.tags.map((tval:Tag) => {
                return (
                  <p className = "font-medium border-2 border-solid border-pink-800 rounded-md p-2 mt-2">
                    <span className = "font-semibold">{`${tval.name}`}:&nbsp;&nbsp;</span>
                    {tval.explanation == ""? "loading...":tval.explanation}
                  </p>
                )
              })}
            </div>
          </div>}
          {filterSkills.Character.tags.length > 0 && <div
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
              {filterSkills.Character.tags.map((tval:Tag) => {
                return (
                  <p className = "font-medium border-2 border-solid border-yellow-800 rounded-md p-2 mt-2">
                    <span className = "font-semibold">{`${tval.name}`}:&nbsp;&nbsp;</span>
                    {tval.explanation == ""? "loading...":tval.explanation}
                  </p>
                )
              })}
            </div>
          </div>}
        </div>)
      }
    </main>
  )
}
