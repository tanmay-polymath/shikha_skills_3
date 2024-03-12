import React from "react"

import { Tag } from "../app/utils/types"

interface Props {
  skill: Tag
  onClick?: (e: any) => void
}

const SkillTag: React.FC<Props> = ({ skill, onClick }) => {
  return (
    <span
      className="focus:translate-z-2 flex translate-y-0 cursor-pointer items-center gap-3 rounded-md bg-zinc-200 px-2 py-1 text-sm font-medium text-zinc-900 hover:bg-zinc-300"
      onClick={onClick}
    >
      <p>{skill.name}</p>
      <p className="rounded-md bg-black px-1 py-0.5 text-xs text-white">{`${skill.score}`}</p>
    </span>
  )
}

export default SkillTag
