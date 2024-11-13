import { StudyCard } from "./StudyCard";

export interface StudySet{
    id: number
    title: string,
    createdAt?: any,
    description: string, 
    username: string,
    terms?: StudyCard[]
}