import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { useEffect, useState } from "react";
import { fetchUserLibrary } from "../../fetchHelper";
import Loading from "../reusables/Loading";
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
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        if(!session.user){
            navigate("/login");
            return
        }
        setLoading(true)
        fetchUserLibrary(session.username).then(({data, error}) => {
            if(error){
                console.error(error)
                return
            }
            setLibrary(data)
        })
        setLoading(false)
    },[])
    const handleSetRedirect = (id : number) => {
        navigate(`/view-set/${id}`)
    }
    if(loading){
        return <Loading/>
    }
    return (
        <div className="d-flex justify-content-center text-center flex-column">
            <h1>My Library</h1>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-5">
                {
                    library?.map( (set) => {
                        return (
                        <div key = {set.id} className="library-set" onClick={ () => handleSetRedirect(set.id)}>
                            <h2>{set.title}</h2>
                            <p>{set.username}</p> 
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}