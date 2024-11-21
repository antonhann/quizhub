import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { searchStudySetByPrefix } from "../../fetchHelper";
import { StudySet } from "../../models/StudySet";
import DisplaySets from "../reusables/components/DisplaySets";

const Search = () => {
    const prefix = useParams().prefix;
    const [studySets, setStudySets] = useState<StudySet[] | null>([])
    useEffect(() => {
        const loadSearchedSet = async () => {
            const data = await (searchStudySetByPrefix(prefix));
            setStudySets(data)
        }
        loadSearchedSet()
    },[])
    return (
        <div>
            <DisplaySets sets = {studySets}/> 
        </div>
    )
}

export default Search
