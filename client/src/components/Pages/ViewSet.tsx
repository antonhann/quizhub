import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchStudySetByID, updateLibrary } from "../../fetchHelper";
import { useSessionContext } from "../../SessionContext";
import { StudySet } from "../../models/StudySet";
import { supabase } from "../../supabaseClient";
import Loading from "../reusables/Loading";
const ViewSet = () => {
    const params = useParams();
    const session = useSessionContext();
    const navigate = useNavigate();

    const [studySet, setStudySet] = useState<StudySet>()
    const [loading, setLoading] = useState<boolean>(false)
    const hasUpdatedLibrary = useRef(false);
    
    useEffect(() => {
        setLoading(true);
        
        const fetchData = async () => {
            const result = await fetchStudySetByID(params.id);
            if (result.error) {
                // Handle error
                setLoading(false);
                return;
            }
            setStudySet(result.data);
            setLoading(false);
        };

        fetchData();

        // Ensure updateLibrary is only called once per render cycle
        if (!hasUpdatedLibrary.current) {
            updateLibrary(params.id, session.username);
            hasUpdatedLibrary.current = true; // Mark as updated
        }
    }, [params.id, session.username]);
    
    const handleEditRedirect = () =>{
        navigate("/create", {state: {studySetID: studySet?.id}})
    }
    const handleDeleteStudySet = async() => {
        const {status, error} = await supabase.from("Study Set").delete().eq("id",studySet?.id)
        if(error){
            console.error(error)
        }else{
            console.log("success in deleting study set", status)
        }
        navigate("/my-library")
    }
    const handleFlashcardClick = async () => {
        navigate(`/flashcard-set/${studySet?.id}`, {state: {originalStudySet: studySet}})
    }

    if(loading){
        return <Loading/>
    }
    if(studySet == undefined){
        return (<div>
            StudySet doesnt exist!
        </div>)
    }

    return (
        <div className="d-flex flex-column gap-5">
            <div>
                <h2>{studySet?.title}</h2>
                <p>{studySet?.description}</p>
            </div>
            <div className="d-flex justify-content-evenly">
                <button onClick={() => handleFlashcardClick()}>Flashcard</button>
                <button>Test</button>
                <button>Learn</button>
                {session.username == studySet?.username && 
                (
                <div className="d-flex gap-3">
                    <button onClick={() => handleEditRedirect()}>Edit</button>
                    <button onClick={() => handleDeleteStudySet()}>Delete</button>
                </div>
                )
                }
            </div>
            <div className="d-flex center flex-column gap-3">
                <h2>Terms</h2>
                {
                    studySet?.terms?.map((card, index) => {
                        return(
                            <div className = "view-card" key={index}>
                                <div>
                                    {card.term}
                                </div>
                                <div>
                                    {card.answer}
                                </div>    
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ViewSet
