import React from "react"
import { StudySet } from "../../../models/StudySet"
import { useNavigate } from "react-router";

interface DisplaySetsProps{
    sets: StudySet[] | null
}

const DisplaySets : React.FC<DisplaySetsProps>= (props) => {
    const{
        sets
    } = props;
    const navigate = useNavigate();
    
    const handleSetRedirect = (id : number) => {
        navigate(`/view-set/${id}`)
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-5">
        {sets?.map( (set) => {
                return (
                <div key = {set.id} className="library-set" onClick={ () => handleSetRedirect(set.id)}>
                    <h2>{set.title}</h2>
                    <p>{set.username}</p> 
                </div>
                )
            })
        }
        </div>
    )
}

export default DisplaySets
