import { supabase } from "./supabaseClient"
export const fetchStudySetByID = async (id : string | undefined) => {
    const response = await supabase.from("Study Set").select("*").eq("id",id)
    if (response.error || !response.data){
        console.error(response.error)
        return {data: [], error: "Error fetching study set!"}
    }
    return {data: response.data[0], error: null}
}

export const fetchUserLibrary = async(username : string) =>{
    const studySets = await supabase.from("Study Set").select("*").eq("username", username)
    if(studySets.error){
        return {data: [], error: null}
    }
    const library = []
    for(let i = 0; i < studySets.data?.length; i++){
        library.push({
            id: studySets.data[i].id,
            title: studySets.data[i].title,
            createdAt: studySets.data[i].createdAt,
            username: studySets.data[i].username
        })
    }
    return {data: library, error: null}
}