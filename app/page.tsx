"use client"

import { useRef, useState } from "react"

import { Analysis, Tag } from "./utils/types"

import SkillTag from "@/components/SkillTag"
import { SkeletonCard } from "@/components/skeleton-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader } from "lucide-react"
import Image from "next/image"
import { useReactToPrint } from "react-to-print"

export default function Home() {
  const textRef = useRef<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [currSkills, setCurrSkills] = useState<Analysis | null>(null)
  const [filterSkills, setFilterSkills] = useState<Analysis | null>(null)
  const [filterSelect, setFilterSelect] = useState<boolean>(false)
  const componentRef = useRef(null)
  // const [api, setApi] = useState<CarouselApi>()
  // const [current, setCurrent] = useState(0)
  // const [count, setCount] = useState(0)
  const [state, setState] = useState({
    name: "",
    grade: "",
    link: "",
  })

  // useEffect(() => {
  //   if (!api) {
  //     return
  //   }

  //   setCount(api.scrollSnapList().length)
  //   setCurrent(api.selectedScrollSnap() + 1)

  //   api.on("select", () => {
  //     console.log("current")
  //     setCurrent(api.selectedScrollSnap() + 1)
  //   })
  // }, [api])

  const handleChange = (fieldName: any) => (event: any) => {
    const value = event.target.value
    setState((prevState) => ({ ...prevState, [fieldName]: value }))
  }

  const filterTags = () => {
    let newObj: Analysis
    newObj = {
      Character: {
        ...currSkills!.Character,
        tags: currSkills!.Character.tags.filter((val: Tag) => val.score >= 90),
      },
      Cognitive: {
        ...currSkills!.Cognitive,
        tags: currSkills!.Cognitive.tags.filter((val: Tag) => val.score >= 90),
      },
      Collaboration: {
        ...currSkills!.Collaboration,
        tags: currSkills!.Collaboration.tags.filter(
          (val: Tag) => val.score >= 90
        ),
      },
      Communication: {
        ...currSkills!.Communication,
        tags: currSkills!.Communication.tags.filter(
          (val: Tag) => val.score >= 90
        ),
      },
      Creativity: {
        ...currSkills!.Creativity,
        tags: currSkills!.Creativity.tags.filter((val: Tag) => val.score >= 90),
      },
      CriticalThinking: {
        ...currSkills!.CriticalThinking,
        tags: currSkills!.CriticalThinking.tags.filter(
          (val: Tag) => val.score >= 90
        ),
      },
    }
    setFilterSkills(newObj)
  }

  const fetchExplanation = async (obj: Analysis) => {
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
      const ctRes = await Promise.all(
        criticalThinkingArr.map((val: Tag) => {
          return fetch("/api/explanation", {
            method: "post",
            body: JSON.stringify({
              message: desc,
              skill: val.name,
            }),
          })
        })
      )

      let len = criticalThinkingArr.length

      for (let i = 0; i < len; i++) {
        const tData = await ctRes[i].json()

        obj.CriticalThinking.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // communication
      const commRes = await Promise.all(
        communicationArr.map((val: Tag) => {
          return fetch("/api/explanation", {
            method: "post",
            body: JSON.stringify({
              message: desc,
              skill: val.name,
            }),
          })
        })
      )

      len = communicationArr.length

      for (let i = 0; i < len; i++) {
        const tData = await commRes[i].json()

        obj.Communication.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // creativity
      const crtRes = await Promise.all(
        creativityArr.map((val: Tag) => {
          return fetch("/api/explanation", {
            method: "post",
            body: JSON.stringify({
              message: desc,
              skill: val.name,
            }),
          })
        })
      )

      len = creativityArr.length

      for (let i = 0; i < len; i++) {
        const tData = await crtRes[i].json()

        obj.Creativity.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // cognitive
      const cogRes = await Promise.all(
        cognitiveArr.map((val: Tag) => {
          return fetch("/api/explanation", {
            method: "post",
            body: JSON.stringify({
              message: desc,
              skill: val.name,
            }),
          })
        })
      )

      len = cognitiveArr.length

      for (let i = 0; i < len; i++) {
        const tData = await cogRes[i].json()

        obj.Cognitive.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // collaboration
      const colabRes = await Promise.all(
        collaborationArr.map((val: Tag) => {
          return fetch("/api/explanation", {
            method: "post",
            body: JSON.stringify({
              message: desc,
              skill: val.name,
            }),
          })
        })
      )

      len = collaborationArr.length

      for (let i = 0; i < len; i++) {
        const tData = await colabRes[i].json()

        obj.Collaboration.tags[i].explanation = tData.message
      }

      // setCurrSkills(obj)
      // setFilterSkills(obj)

      // character
      const chrRes = await Promise.all(
        characterArr.map((val: Tag) => {
          return fetch("/api/explanation", {
            method: "post",
            body: JSON.stringify({
              message: desc,
              skill: val.name,
            }),
          })
        })
      )

      len = characterArr.length

      for (let i = 0; i < len; i++) {
        const tData = await chrRes[i].json()

        obj.Character.tags[i].explanation = tData.message
      }

      setLoading(false)

      setCurrSkills(obj)
      // setFilterSkills(obj)

      const newObj: Analysis = filterSelect
        ? {
            Character: {
              ...obj!.Character,
              tags: obj!.Character.tags.filter((val: Tag) => val.score >= 90),
            },
            Cognitive: {
              ...obj!.Cognitive,
              tags: obj!.Cognitive.tags.filter((val: Tag) => val.score >= 90),
            },
            Collaboration: {
              ...obj!.Collaboration,
              tags: obj!.Collaboration.tags.filter(
                (val: Tag) => val.score >= 90
              ),
            },
            Communication: {
              ...obj!.Communication,
              tags: obj!.Communication.tags.filter(
                (val: Tag) => val.score >= 90
              ),
            },
            Creativity: {
              ...obj!.Creativity,
              tags: obj!.Creativity.tags.filter((val: Tag) => val.score >= 90),
            },
            CriticalThinking: {
              ...obj!.CriticalThinking,
              tags: obj!.CriticalThinking.tags.filter(
                (val: Tag) => val.score >= 90
              ),
            },
          }
        : obj

      setFilterSkills(newObj)
    } catch (error) {
      setLoading(false)
      console.log("Error !!")
      console.log(error)
    }
  }

  const checkHandler = async () => {
    try {
      const data = textRef.current!.value.trim()

      if (data.length == 0) return

      setLoading(true)
      // setCurrent(0)
      // setCount(0)

      const apiRes = await Promise.all([
        fetch("/api/getSubskills", {
          method: "post",
          body: JSON.stringify({
            message: data,
            skill: "CriticalThinking",
          }),
        }),
        //7
        fetch("/api/getSubskills", {
          method: "post",
          body: JSON.stringify({
            message: data,
            skill: "Cognitive",
          }),
        }),
        //8
        fetch("/api/getSubskills", {
          method: "post",
          body: JSON.stringify({
            message: data,
            skill: "Creativity",
          }),
        }),
        //9
        fetch("/api/getSubskills", {
          method: "post",
          body: JSON.stringify({
            message: data,
            skill: "Communication",
          }),
        }),
        //10
        fetch("/api/getSubskills", {
          method: "post",
          body: JSON.stringify({
            message: data,
            skill: "Collaboration",
          }),
        }),
        //11
        fetch("/api/getSubskills", {
          method: "post",
          body: JSON.stringify({
            message: data,
            skill: "Character",
          }),
        }),
      ])

      setLoading(false)

      const anaRes: string[] = []

      for (let i = 0; i < 6; i++) {
        const temp = await apiRes[i].json()

        if (!temp.success) {
          setCurrSkills(null)
          setFilterSkills(null)
          return
        }

        anaRes.push(temp.message)
      }

      console.log(anaRes)

      const obj: Analysis = {
        Cognitive: {
          score: "0",
          tags: [
            ...anaRes[1]
              .split(`\"skills\":`)[1]
              .trim()
              .replace(/\[|\]/g, "")
              .split(","),
          ]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: "",
              }
            })
            .filter((val) => val.score && val.score > 0),
        },
        Collaboration: {
          score: "0",
          tags: [
            ...anaRes[4]
              .split(`\"skills\":`)[1]
              .trim()
              .replace(/\[|\]/g, "")
              .split(","),
          ]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: "",
              }
            })
            .filter((val) => val.score && val.score > 0),
        },
        Communication: {
          score: "0",
          tags: [
            ...anaRes[3]
              .split(`\"skills\":`)[1]
              .trim()
              .replace(/\[|\]/g, "")
              .split(","),
          ]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: "",
              }
            })
            .filter((val) => val.score && val.score > 0),
        },
        Creativity: {
          score: "0",
          tags: [
            ...anaRes[2]
              .split(`\"skills\":`)[1]
              .trim()
              .replace(/\[|\]/g, "")
              .split(","),
          ]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: "",
              }
            })
            .filter((val) => val.score && val.score > 0),
        },
        CriticalThinking: {
          score: "0",
          tags: [
            ...anaRes[0]
              .split(`\"skills\":`)[1]
              .trim()
              .replace(/\[|\]/g, "")
              .split(","),
          ]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: "",
              }
            })
            .filter((val) => val.score && val.score > 0),
        },
        Character: {
          score: "0",
          tags: [
            ...anaRes[5]
              .split(`\"skills\":`)[1]
              .trim()
              .replace(/\[|\]/g, "")
              .split(","),
          ]
            .filter((val) => val.trim().length > 5)
            .map((val) => {
              const t = val.trim().split(":")

              return {
                name: t[0],
                score: parseInt(t[1]),
                explanation: "",
              }
            })
            .filter((val) => val.score && val.score > 0),
        },
      }

      // Sorting
      obj.Character.tags.sort((a: Tag, b: Tag) => {
        return a.score > b.score ? -1 : 1
      })

      obj.Communication.tags.sort((a: Tag, b: Tag) => {
        return a.score > b.score ? -1 : 1
      })

      obj.Creativity.tags.sort((a: Tag, b: Tag) => {
        return a.score > b.score ? -1 : 1
      })

      obj.CriticalThinking.tags.sort((a: Tag, b: Tag) => {
        return a.score > b.score ? -1 : 1
      })

      obj.Cognitive.tags.sort((a: Tag, b: Tag) => {
        return a.score > b.score ? -1 : 1
      })

      obj.Collaboration.tags.sort((a: Tag, b: Tag) => {
        return a.score > b.score ? -1 : 1
      })

      console.log("Tags")
      console.log(obj)
      // setFilterSkills(obj)
      setCurrSkills(obj)

      const newObj: Analysis = filterSelect
        ? {
            Character: {
              ...obj!.Character,
              tags: obj!.Character.tags.filter((val: Tag) => val.score >= 90),
            },
            Cognitive: {
              ...obj!.Cognitive,
              tags: obj!.Cognitive.tags.filter((val: Tag) => val.score >= 90),
            },
            Collaboration: {
              ...obj!.Collaboration,
              tags: obj!.Collaboration.tags.filter(
                (val: Tag) => val.score >= 90
              ),
            },
            Communication: {
              ...obj!.Communication,
              tags: obj!.Communication.tags.filter(
                (val: Tag) => val.score >= 90
              ),
            },
            Creativity: {
              ...obj!.Creativity,
              tags: obj!.Creativity.tags.filter((val: Tag) => val.score >= 90),
            },
            CriticalThinking: {
              ...obj!.CriticalThinking,
              tags: obj!.CriticalThinking.tags.filter(
                (val: Tag) => val.score >= 90
              ),
            },
          }
        : obj

      setFilterSkills(newObj)

      fetchExplanation(obj)
    } catch (error) {
      console.log("Error !!")
      console.log(error)
      setLoading(false)
      setCurrSkills(null)
      setFilterSkills(null)
    }
  }

  const toggle = () => {
    setFilterSelect((prev) => !prev)

    if (!filterSelect) {
      filterTags()
    }

    if (filterSelect) {
      setFilterSkills(currSkills)
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Skills Assessment",
    onPrintError: () => alert("there is an error when printing"),
    pageStyle: "@page { size: A4; margin: 8mm; }",
  })

  return (
    <main className="my-12 flex w-full flex-1 flex-col items-center justify-start px-4 sm:mt-12">
      <div className="mb-7 flex items-center gap-1">
        <Image
          unoptimized
          priority
          src="/logo_new.png"
          height={150}
          width={150}
          alt="Logo"
        />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Skills Assessment
      </h1>
      <div className="mt-8 flex w-full max-w-2xl flex-col">
        <div id="name-div">
          <p className="text-lg font-semibold">Name</p>
          <div className="mt-1">
            <input
              type="text"
              className="w-full rounded-md border border-zinc-300 p-2 px-4 text-zinc-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent"
              placeholder="Enter name"
              required
              value={state.name}
              onChange={handleChange("name")}
            />
          </div>
        </div>
        <div id="grade-div" className="mt-8">
          <p className="text-lg font-semibold">Grade</p>
          <div className="mt-1">
            <input
              type="text"
              className="w-full rounded-md border border-zinc-300 p-2 px-4 text-zinc-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent"
              placeholder="Enter grade"
              required
              value={state.grade}
              onChange={handleChange("grade")}
            />
          </div>
        </div>
        <div id="link-div" className="mt-8">
          <p className="text-lg font-semibold">Description</p>
          <div className="mt-1">
            <textarea
              // type="text"
              className="w-full min-h-[100px] rounded-md border border-zinc-300 p-2 px-4 text-zinc-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent"
              placeholder="Enter description"
              required
              ref={textRef}
              value={state.link}
              onChange={handleChange("link")}
            />
          </div>
        </div>
        <Button onClick={checkHandler} className="mt-7 text-xl font-normal">
          {loading ? <Loader className="animate-spin" /> : "Analyse"}
        </Button>
      </div>

      {filterSkills != null && (
        <div className="mt-10 flex w-full flex-col gap-0 p-4">
          <div className="mx-auto my-0 flex w-full max-w-6xl items-center space-x-2">
            <Switch onCheckedChange={toggle} id="airplane-mode" />
            <Label htmlFor="airplane-mode">
              Filter skills (score {`>`} 90)
            </Label>
          </div>
          <Carousel
            // setApi={setApi}
            className="mx-auto mt-4 w-full max-w-6xl"
          >
            <CarouselContent className="mb-4">
              {filterSkills.Communication.tags.length > 0 && (
                <CarouselItem>
                  <Card className="size-full">
                    <CardHeader>
                      <CardTitle>Communication</CardTitle>
                      <div className="flex w-full gap-4">
                        {filterSkills.Communication.tags.map((val, i) => (
                          <SkillTag skill={val} key={i} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filterSkills.Communication.tags.map((tval: Tag) => {
                        return (
                          <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                            <span className="font-semibold">
                              {`${tval.name}`}:&nbsp;&nbsp;
                            </span>
                            {tval.explanation == "" ? (
                              <SkeletonCard />
                            ) : (
                              tval.explanation
                            )}
                          </p>
                        )
                      })}
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              {filterSkills.Creativity.tags.length > 0 && (
                <CarouselItem>
                  <Card className="size-full">
                    <CardHeader>
                      <CardTitle>Creativity</CardTitle>
                      <div className="flex w-full gap-4">
                        {filterSkills.Creativity.tags.map((val, i) => (
                          <SkillTag skill={val} key={i} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filterSkills.Creativity.tags.map((tval: Tag) => {
                        return (
                          <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                            <span className="font-semibold">
                              {`${tval.name}`}:&nbsp;&nbsp;
                            </span>
                            {tval.explanation == "" ? (
                              <SkeletonCard />
                            ) : (
                              tval.explanation
                            )}
                          </p>
                        )
                      })}
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              {filterSkills.CriticalThinking.tags.length > 0 && (
                <CarouselItem>
                  <Card className="size-full">
                    <CardHeader>
                      <CardTitle>Critical Thinking</CardTitle>
                      <div className="flex w-full gap-4">
                        {filterSkills.CriticalThinking.tags.map((val, i) => (
                          <SkillTag skill={val} key={i} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filterSkills.CriticalThinking.tags.map((tval: Tag) => {
                        return (
                          <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                            <span className="font-semibold">
                              {`${tval.name}`}:&nbsp;&nbsp;
                            </span>
                            {tval.explanation == "" ? (
                              <SkeletonCard />
                            ) : (
                              tval.explanation
                            )}
                          </p>
                        )
                      })}
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              {filterSkills.Cognitive.tags.length > 0 && (
                <CarouselItem>
                  <Card className="size-full">
                    <CardHeader>
                      <CardTitle>Cognitive</CardTitle>
                      <div className="flex w-full gap-4">
                        {filterSkills.Cognitive.tags.map((val, i) => (
                          <SkillTag skill={val} key={i} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filterSkills.Cognitive.tags.map((tval: Tag) => {
                        return (
                          <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                            <span className="font-semibold">
                              {`${tval.name}`}:&nbsp;&nbsp;
                            </span>
                            {tval.explanation == "" ? (
                              <SkeletonCard />
                            ) : (
                              tval.explanation
                            )}
                          </p>
                        )
                      })}
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              {filterSkills.Collaboration.tags.length > 0 && (
                <CarouselItem>
                  <Card className="size-full">
                    <CardHeader>
                      <CardTitle>Collaboration</CardTitle>
                      <div className="flex w-full gap-4">
                        {filterSkills.Collaboration.tags.map((val, i) => (
                          <SkillTag skill={val} key={i} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filterSkills.Collaboration.tags.map((tval: Tag) => {
                        return (
                          <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                            <span className="font-semibold">
                              {`${tval.name}`}:&nbsp;&nbsp;
                            </span>
                            {tval.explanation == "" ? (
                              <SkeletonCard />
                            ) : (
                              tval.explanation
                            )}
                          </p>
                        )
                      })}
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              {filterSkills.Character.tags.length > 0 && (
                <CarouselItem>
                  <Card className="size-full">
                    <CardHeader>
                      <CardTitle>Character</CardTitle>
                      <div className="flex w-full gap-4">
                        {filterSkills.Character.tags.map((val, i) => (
                          <SkillTag skill={val} key={i} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filterSkills.Character.tags.map((tval: Tag) => {
                        return (
                          <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                            <span className="font-semibold">
                              {`${tval.name}`}:&nbsp;&nbsp;
                            </span>
                            {tval.explanation == "" ? (
                              <SkeletonCard />
                            ) : (
                              tval.explanation
                            )}
                          </p>
                        )
                      })}
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
            </CarouselContent>
            {/* <div className="text-center text-lg font-semibold text-black">
              {current} <span className="font-normal">/</span> {count}
            </div> */}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {!loading && (
            <Button
              onClick={handlePrint}
              className="mx-auto w-auto px-5 text-lg mt-5"
            >
              Export
            </Button>
          )}
          <div
            ref={componentRef}
            className=" hidden print:h-full print:w-full print:block"
          >
            <div className="print:mb-6">
              <Image
                unoptimized
                priority
                src="/logo_new.png"
                height={150}
                width={150}
                alt="Logo"
              />
            </div>
            <h1 className="font-extrabold text-xl block mb-3 underline underline-offset-4">
              Project Skills Tagger
            </h1>
            <div className="header hidden print:fixed print:bottom-0 print:right-0 print:block">
              <Image
                unoptimized
                priority
                src="/logo_new.png"
                height={150}
                width={150}
                alt="Logo"
              />
            </div>
            <div className="print:block hidden print:text-lg print:bg-zinc-100 print:p-2 print:rounded-md print:mb-6 print:border print:border-zinc-300 print:px-4">
              <div className="flex gap-3">
                <span className="font-bold">Name:</span>
                <span>{state.name}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">Grade: </span>
                <span>{state.grade}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">Description: </span>
                <span>{state.link}</span>
              </div>
            </div>
            <h1 className="font-bold text-lg block mb-3 underline underline-offset-4">
              Skills Detected
            </h1>
            {filterSkills.Communication.tags.length > 0 && (
              // <CarouselItem>
              <Card className="size-full print:break-after-page">
                <CardHeader>
                  <CardTitle>Communication</CardTitle>
                  <div className="flex w-full gap-4">
                    {filterSkills.Communication.tags.map((val, i) => (
                      <SkillTag skill={val} key={i} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {filterSkills.Communication.tags.map((tval: Tag) => {
                    return (
                      <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                        <span className="font-semibold">
                          {`${tval.name}`}:&nbsp;&nbsp;
                        </span>
                        {tval.explanation == "" ? (
                          <SkeletonCard />
                        ) : (
                          tval.explanation
                        )}
                      </p>
                    )
                  })}
                </CardContent>
              </Card>
              // </CarouselItem>
            )}
            {filterSkills.Creativity.tags.length > 0 && (
              // <CarouselItem>
              <Card className="size-full print:break-after-page">
                <CardHeader>
                  <CardTitle>Creativity</CardTitle>
                  <div className="flex w-full gap-4">
                    {filterSkills.Creativity.tags.map((val, i) => (
                      <SkillTag skill={val} key={i} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {filterSkills.Creativity.tags.map((tval: Tag) => {
                    return (
                      <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                        <span className="font-semibold">
                          {`${tval.name}`}:&nbsp;&nbsp;
                        </span>
                        {tval.explanation == "" ? (
                          <SkeletonCard />
                        ) : (
                          tval.explanation
                        )}
                      </p>
                    )
                  })}
                </CardContent>
              </Card>
              // </CarouselItem>
            )}
            {filterSkills.CriticalThinking.tags.length > 0 && (
              // <CarouselItem>
              <Card className="size-full print:break-after-page">
                <CardHeader>
                  <CardTitle>Critical Thinking</CardTitle>
                  <div className="flex w-full gap-4">
                    {filterSkills.CriticalThinking.tags.map((val, i) => (
                      <SkillTag skill={val} key={i} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {filterSkills.CriticalThinking.tags.map((tval: Tag) => {
                    return (
                      <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                        <span className="font-semibold">
                          {`${tval.name}`}:&nbsp;&nbsp;
                        </span>
                        {tval.explanation == "" ? (
                          <SkeletonCard />
                        ) : (
                          tval.explanation
                        )}
                      </p>
                    )
                  })}
                </CardContent>
              </Card>
              // </CarouselItem>
            )}
            {filterSkills.Cognitive.tags.length > 0 && (
              // <CarouselItem>
              <Card className="size-full print:break-after-page">
                <CardHeader>
                  <CardTitle>Cognitive</CardTitle>
                  <div className="flex w-full gap-4">
                    {filterSkills.Cognitive.tags.map((val, i) => (
                      <SkillTag skill={val} key={i} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {filterSkills.Cognitive.tags.map((tval: Tag) => {
                    return (
                      <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                        <span className="font-semibold">
                          {`${tval.name}`}:&nbsp;&nbsp;
                        </span>
                        {tval.explanation == "" ? (
                          <SkeletonCard />
                        ) : (
                          tval.explanation
                        )}
                      </p>
                    )
                  })}
                </CardContent>
              </Card>
              // </CarouselItem>
            )}
            {filterSkills.Collaboration.tags.length > 0 && (
              // <CarouselItem>
              <Card className="size-full print:break-after-page">
                <CardHeader>
                  <CardTitle>Collaboration</CardTitle>
                  <div className="flex w-full gap-4">
                    {filterSkills.Collaboration.tags.map((val, i) => (
                      <SkillTag skill={val} key={i} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {filterSkills.Collaboration.tags.map((tval: Tag) => {
                    return (
                      <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                        <span className="font-semibold">
                          {`${tval.name}`}:&nbsp;&nbsp;
                        </span>
                        {tval.explanation == "" ? (
                          <SkeletonCard />
                        ) : (
                          tval.explanation
                        )}
                      </p>
                    )
                  })}
                </CardContent>
              </Card>
              // </CarouselItem>
            )}
            {filterSkills.Character.tags.length > 0 && (
              // <CarouselItem>
              <Card className="size-full print:break-after-page">
                <CardHeader>
                  <CardTitle>Character</CardTitle>
                  <div className="flex w-full gap-4">
                    {filterSkills.Character.tags.map((val, i) => (
                      <SkillTag skill={val} key={i} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {filterSkills.Character.tags.map((tval: Tag) => {
                    return (
                      <p className="mb-3 rounded-md border border-dashed border-zinc-400 px-4 py-3 font-medium">
                        <span className="font-semibold">
                          {`${tval.name}`}:&nbsp;&nbsp;
                        </span>
                        {tval.explanation == "" ? (
                          <SkeletonCard />
                        ) : (
                          tval.explanation
                        )}
                      </p>
                    )
                  })}
                </CardContent>
              </Card>
              // </CarouselItem>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
