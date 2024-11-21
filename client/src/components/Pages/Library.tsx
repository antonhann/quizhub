import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { useEffect, useState } from "react";
import { fetchUserLibrary, fetchUserStudySets } from "../../fetchHelper";
import Loading from "../reusables/tools/Loading";
import DisplaySets from "../reusables/components/DisplaySets";
import { StudySet } from "../../models/StudySet";
export const Library = () => {
    const session = useSessionContext();
    const navigate = useNavigate();
    const [recent, setRecent] = useState<StudySet[] | null>([])
    const [mySets, setMySets] = useState<StudySet[] | null>([])
    const [showingLibrary, setShowingLibrary] = useState<boolean>(true)
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
            setRecent(data)
        })
        fetchUserStudySets(session.username).then(({data, error}) => {
            if(error){
                console.error(error)
                return
            }
            setMySets(data)
            setLoading(false)
        })
    },[])
    const handleSelectChange = (event : any) => {
        setShowingLibrary(event.target.value === 'recents');
    };

    if(loading){
        return <Loading/>
    }
    return (
        <div className="no-center w-100">
            <h1>Your Library</h1>
            <select 
                    onChange={handleSelectChange} 
                    className="dropdown-select"
                    value={showingLibrary ? 'recents' : 'created'}
                >
                    <option value="recents">Recents</option>
                    <option value="created">Created</option>
            </select>
            <DisplaySets sets={showingLibrary ? recent : mySets} /> 
        </div>
    );
}