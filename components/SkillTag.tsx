import React from "react"

import { Tag } from "../app/utils/types"

interface Props {
  skill: Tag
}

const SkillTag: React.FC<Props> = ({ skill }) => {
  return (
    <span className="flex items-center gap-3 rounded-md bg-zinc-200 px-2 py-1 text-sm font-medium text-zinc-900">
      <p>{skill.name}</p>
      <p className="rounded-md bg-black px-1 py-0.5 text-xs text-white">{`${skill.score}`}</p>
    </span>
  )
}

export default SkillTag
