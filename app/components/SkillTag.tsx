import React from 'react'

import { Tag } from '../utils/types'

interface Props {
  skill: Tag
}

const SkillTag:React.FC<Props> = ({skill}) => {
  return (
    <div className = "py-1 px-2 bg-white text-black border-2 border-black rounded-lg flex items-center justify-center gap-2">
      <p>{skill.name}</p>
      <p className = "p-1 rounded-full bg-black text-white">
        {`${skill.score}`}
      </p>
    </div>
  )
}

export default SkillTag