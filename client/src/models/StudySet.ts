import { StudyCard } from "./StudyCard";

export interface StudySet{
    id: number
    title: string,
    description: string, 
    username: string,
    terms: StudyCard[]
}