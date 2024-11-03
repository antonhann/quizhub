import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { useEffect, useState } from "react";
import { fetchUserLibrary } from "../../fetchHelper";
interface StudySet{
    id: number
    title: string
    username: string
    createdAt: Date
}
export const Library = () => {
    const session = useSessionContext();
    const navigate = useNavigate();
    const [library, setLibrary] = useState<StudySet[] | null>([])
    useEffect(() => {
        console.log(session)
        if(!session.user){
            navigate("/login");
            return
        }
        fetchUserLibrary(session.username).then(({data, error}) => {
            if(error){
                console.error(error)
                return
            }
            setLibrary(data)
        })
    },[])
    const handleSetRedirect = (id : number) => {
        navigate(`/view-set/${id}`)
    }
    return (
        <div>
            <h2>My Library</h2>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-5">
                {
                    library?.map( (set) => {
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