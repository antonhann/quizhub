import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { AppContainer } from "../reusables/AppContainer"
import { useEffect, useState } from "react";

interface StudyCard{
    id: number
    term : string
    answer : string
}
const DEFAULT_STUDY_SET : StudyCard[]= [
    {
        id: 0,
        term: "",
        answer: "",
    },
    {
        id: 1,
        term: "",
        answer: "",
    },
    {
        id: 2,
        term: "",
        answer: "",
    },
]
export const Create = () => {
    const session = useSessionContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [studySet, setStudySet] = useState<StudyCard[]>(DEFAULT_STUDY_SET)


    // useEffect(() => {
    //     if(!session.user){
    //         navigate("/login");
    //     }
    // },[])

    const handleStudyCardDelete = (id: number) => {
        if (studySet.length == 1){
            return
        }
        setStudySet((prevCards) => prevCards.filter(card => card.id !== id));
    }
    const handleStudyCardUpdate = (id: number, updatedTerm: string, updatedAnswer: string) => {
        setStudySet((prevCards) => {
            const n = prevCards.map(card =>
                card.id === id ? { ...card, term: updatedTerm, answer: updatedAnswer } : card
            )
            console.log(n)
            return n
            }
        );
    }
    const handleAddingStudyCard = () => {
        const defaultCard = {
            id: studySet.length,
            term: "",
            answer: ""
        }
        setStudySet(prevSet => [...prevSet, defaultCard]);
    }

    return (
        <AppContainer>
            <form className="d-flex flex-column justify-content-center align-items-center">
                <div className= "">
                    <input className = "" type="text" placeholder = "Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <textarea className = "" placeholder = "Descripition" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="">
                    {
                        studySet.map((card, index) => {
                            return (
                                <StudyCardInput
                                    key = {index}
                                    id = {index}
                                    term = {card.term}
                                    answer = {card.answer}
                                    handleDelete = {handleStudyCardDelete}
                                    handleUpdate = {handleStudyCardUpdate}
                                />
                            )
                        })
                    }
                </div>
                <button type = "button" onClick={() => handleAddingStudyCard()}>+</button>
            </form>
        </AppContainer>
    )
}

interface StudyCardProps{
    id: number
    term: string
    answer: string
    handleDelete: (id: number) => void
    handleUpdate: (id: number, updatedTerm: string, updatedAnswer: string) => void 
}
export const StudyCardInput : React.FC<StudyCardProps> = (
    {
        id,
        term,
        answer, 
        handleDelete,
        handleUpdate
    }
) => {

    return(
        <div className="studyCard" key = {id}>
            <textarea placeholder="Term" value = {term} onChange={(e) => handleUpdate(id, e.target.value, answer)}></textarea>
            <textarea placeholder="Answer" value = {answer} onChange={(e) =>handleUpdate(id, term, e.target.value)}></textarea>       
            <button type = "button" onClick={() => handleDelete(id)}>X</button>
        </div>
    )
}