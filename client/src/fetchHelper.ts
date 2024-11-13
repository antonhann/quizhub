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
    const response = await supabase.from("Library")
    .select("*")
    .eq("username", username)
    if(response.error){
        return {data: [], error: response.error}
    }
    const library = []
    for(let i = 0; i < response.data?.length; i++){
        let studySet = await fetchStudySetByID(response.data[i].studySetID)
        library.push({
            id: studySet.data.id,
            title: studySet.data.title,
            lastOpened: response.data[i].lastOpened,
            username: studySet.data.username,
            description: studySet.data.description
        })
    }
    // Sort by lastOpened in descending order (latest first)
    library.sort((a, b) => {
        const dateA = new Date(a.lastOpened);
        const dateB = new Date(b.lastOpened);
    
        // TypeScript now knows dateA and dateB are Date objects
        return dateB.getTime() - dateA.getTime();  // Use getTime() to ensure we are comparing numeric timestamps
    });

    return {data: library, error: null}
}

export const fetchFlashcardData = async(username : string, studySetID : string | undefined) => {
    const response = await supabase.from("Flashcard")
        .select("*")
        .eq("username",username)
        .eq("studySetID",studySetID)
        .single()
    if (!response.data){
        
    }
    return {
        data: response.data,
        error: response.error
    }
}
export const searchStudySetByPrefix = async (prefix : string | undefined) => {
    const { data, error } = await supabase
        .from('Study Set')
        .select('*')
        .ilike('title', `${prefix}%`); // Case-insensitive prefix search

    if (error) {
        console.error('Error searching study sets:', error);
        return null;
    }

    return data;
}
export const updateLibrary = async (
    studySetID: string | undefined,
    username: string
) => {
    const data = {
        username: username,
        studySetID: studySetID,
        lastOpened: new Date()
    };

    // Perform the initial lookup to find an existing record
    const find = await supabase.from("Library")
        .select("*")
        .eq("username", username)
        .eq("studySetID", studySetID);
    console.log(find)
    let response;  


    if (find.data?.length === 0) {
        // No record found, insert new record
        response = await supabase.from("Library")
            .insert(data)
            .select("*")
            .single();
    } else {
        // Record found, update the existing record
        response = await supabase.from("Library")
            .update(data)
            .eq("username", username)
            .eq("studySetID", studySetID)
            .select("*")
            .single();
    }

    if (response.error) {
        console.error(response.error);
    }

    return {
        data: response.data,
        error: response.error
    };
};