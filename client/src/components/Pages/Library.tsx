import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { useEffect, useState } from "react";
import { fetchUserLibrary } from "../../fetchHelper";
import Loading from "../reusables/Loading";
import DisplaySets from "../reusables/DisplaySets";
import { StudySet } from "../../models/StudySet";
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
    if(loading){
        return <Loading/>
    }
    return (
        <div className="d-flex justify-content-center text-center flex-column">
            <h1>My Library</h1>
            <DisplaySets sets = {library}/> 
        </div>
    )
}