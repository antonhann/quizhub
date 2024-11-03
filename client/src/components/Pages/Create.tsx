import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { useEffect, useState } from "react";
import { serializeStudyCards, StudyCard } from "../../models/StudyCard";
import { supabase } from "../../supabaseClient";

const DEFAULT_STUDY_SET : StudyCard[]= []
for(let i = 0; i < 3; i++){
    DEFAULT_STUDY_SET.push(new StudyCard(i))
}
export const Create = () => {
    const session = useSessionContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [studyCards, setStudyCards] = useState<StudyCard[]>(DEFAULT_STUDY_SET)


    useEffect(() => {
        console.log(session)
        if(!session.user){
            navigate("/login");
        }
    },[])

    const handleStudyCardDelete = (id: number) => {
        if (studyCards.length == 1){
            return
        }
        setStudyCards((prevCards) => prevCards.filter(card => card.id !== id));
    }
    const handleStudyCardUpdate = (id: number, updatedTerm: string, updatedAnswer: string) => {
        setStudyCards((prevCards) => {
            const n = prevCards.map(card =>
                card.id === id ? { ...card, term: updatedTerm, answer: updatedAnswer } : card
            )
            return n
        }
        );
    }
    const handleAddingStudyCard = () => {
        const defaultCard = {
            id: studyCards.length,
            term: "",
            answer: ""
        }
        setStudyCards(prevSet => [...prevSet, defaultCard]);
    }
    const handleCreateStudySet = async (e : any) => {
        e.preventDefault()
        console.log(session)
        const data = {
            username: session.username,
            title: title,
            description: description,
            terms: serializeStudyCards(studyCards)
        }

        const response = await supabase.from("Study Set").insert(data)
        console.log(response)
        if (response.error){
            console.error(response.error)
        }else{
            console.log("success")
        }
    }
    return (
        <div>
            <form className="d-flex flex-column justify-content-center align-items-center p-5 gap-5" onSubmit={(e) => handleCreateStudySet(e)}>
                <div className= "">
                    <input className = "" type="text" placeholder = "Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <input className = "" placeholder = "Descripition" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                </div>
                <div className="">
                    {
                        studyCards.map((card, index) => {
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
                <button type = "submit">SUBMIT</button>
            </form>
        </div>
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
            <input placeholder="Term" value = {term} onChange={(e) => handleUpdate(id, e.target.value, answer)}></input>
            <input placeholder="Answer" value = {answer} onChange={(e) =>handleUpdate(id, term, e.target.value)}></input>       
            <button type = "button" onClick={() => handleDelete(id)}>X</button>
        </div>
    )
}