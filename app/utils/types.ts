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
    explanation: string
}

export interface Analysis {
    CriticalThinking: {
        score: string,
        tags: Tag[],
        // explanation: string
    }
    Communication: {
        score: string,
        tags: Tag[],
        // explanation: string
    }
    Creativity: {
        score: string,
        tags: Tag[],
        // explanation: string
    }
    Cognitive: {
        score: string,
        tags: Tag[],
        // explanation: string
    }
    Collaboration: {
        score: string,
        tags: Tag[],
        // explanation: string
    }
    Character: {
        score: string,
        tags: Tag[],
        // explanation: string
    }
}