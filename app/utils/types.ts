export interface Skills {
    CriticalThinking: string
    Communication: string
    Creativity: string
    Cognitive: string
    Collaboration: string
    Character: string
}

export interface Tag {
    name: string
    score: number
}

export interface Analysis {
    CriticalThinking: {
        score: string,
        tags: Tag[]
    }
    Communication: {
        score: string,
        tags: Tag[]
    }
    Creativity: {
        score: string,
        tags: Tag[]
    }
    Cognitive: {
        score: string,
        tags: Tag[]
    }
    Collaboration: {
        score: string,
        tags: Tag[]
    }
    Character: {
        score: string,
        tags: Tag[]
    }
}