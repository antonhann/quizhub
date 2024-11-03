import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
interface StudySet{
    id: number
    title: string
    username: string
    createdAt: Date
}
export const Library = () => {
    const session = useSessionContext();
    const navigate = useNavigate();
    const [studyCards, setStudyCards] = useState<StudySet[] | null>([])
    useEffect(() => {
        if(!session.user){
            navigate("/login");
        }
        const fetchStudySet = async( ) =>{
            const studySets = await supabase.from("Study Set").select("*").eq("username", session.username)
            console.log(studySets)
            if(studySets.error){
                return
            }
            const library = []
            for(let i = 0; i < studySets.data?.length; i++){
                library.push({
                    id: studySets.data[i].id,
                    title: studySets.data[i].title,
                    createdAd: studySets.data[i].createdAt,
                    username: studySets.data[i].username
                })
            }
            setStudyCards(studySets.data)
        }
        fetchStudySet()
    },[])
    const handleSetRedirect = (id : number) => {
        navigate(`/view-set/${id}`)
    }
    return (
        <div>
            <h2>My Library</h2>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-5">
                {
                    studyCards?.map( (set) => {
                        return (
                        <div key = {set.id} className="library-set" onClick={ () => handleSetRedirect(set.id)}>
                            <h1>{set.title}</h1>
                            <h3>{set.username}</h3> 
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}