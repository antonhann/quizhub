import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StudyCard } from "../../models/StudyCard";
import { fetchStudySetByID } from "../../fetchHelper";
interface StudySet{
    title: string,
    description: string, 
    username: string,
    terms: StudyCard[]
}
const ViewSet = () => {
    const params = useParams();
    const [studySet, setStudySet] = useState<StudySet>()
    useEffect(() =>{
        fetchStudySetByID(params.id).then((result) =>{
            if(result.error){
                //handle error
                return
            }
            setStudySet(result.data)
        })
    },[])
    return (
        <div>
            <div>
                <h2>{studySet?.title}</h2>
                <p>{studySet?.description}</p>
            </div>
            <div>
                <button>Flashcard</button>
                <button>Test</button>
                <button>Learn</button>
            </div>
            <div>
                {
                    studySet?.terms.map((card) => {
                        return(
                            <div key={card.id}>
                                <h4>{card.term}</h4>
                                <h4>{card.answer}</h4>    
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ViewSet
