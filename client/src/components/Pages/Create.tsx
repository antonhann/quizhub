import { useLocation, useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext";
import React, { useEffect, useState } from "react";
import { serializeStudyCards, StudyCard } from "../../models/StudyCard";
import { supabase } from "../../supabaseClient";
import { fetchStudySetByID } from "../../fetchHelper";
import Loading from "../reusables/tools/Loading";

const DEFAULT_STUDY_SET: StudyCard[] = [
    new StudyCard(1),
    new StudyCard(2),
    new StudyCard(3)
];

export const Create = () => {
    const session = useSessionContext();
    const navigate = useNavigate();
    const location = useLocation();
    const { studySetID } = location.state || {};
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [terms, setTerms] = useState<StudyCard[]>(DEFAULT_STUDY_SET);
    const [editing, setEditing] = useState<boolean>(false);
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        if (studySetID) {
            fetchStudySetByID(studySetID).then(({data,error}) => {
                if (error){
                    console.error(error);
                    return
                }
                setEditing(true);
                setTerms(data.terms);
                setTitle(data.title);
                setDescription(data.description);
            })
        }
        setLoading(false)
    }, []);
    const handleStudyCardDelete = (id: number) => {
        if (terms.length === 1) {
            return; // Prevent deletion of the last card
        }
        setTerms((prevCards) => prevCards.filter(card => card.id !== id));
    };

    const handleStudyCardUpdate = (id: number, updatedTerm: string, updatedAnswer: string) => {
        setTerms((prevCards) => {
            const updatedCards = prevCards.map((card, index) =>
                index === id ? { ...card, term: updatedTerm, answer: updatedAnswer } : card
            );
            return updatedCards;
        });
    };

    const handleAddingStudyCard = () => {
        const newCardId = terms.length + 1; // Generate a unique ID
        const defaultCard = new StudyCard(newCardId);
        setTerms(prevSet => [...prevSet, defaultCard]);
    };

    const handleCreateStudySet = async (e: any) => {
        e.preventDefault();
        let filteredTerms = terms.filter(card => card.term.trim() !== "");
        console.log(filteredTerms.length)
        if(title.length < 3 || filteredTerms.length == 0){
            setError("Invalid Study Set!")
            return
        }
        const data = {
            username: session.username,
            title: title,
            description: description,
            terms: serializeStudyCards(filteredTerms)
        };
        let response;
        if (editing) {
            // Update the existing study set
            response = await supabase
                .from("Study Set")
                .update(data)
                .eq("id", studySetID)
                .select("*")
                .single(); // Ensures only one row is returned
        } else {
            // Insert a new study set
            response = await supabase
                .from("Study Set")
                .insert(data)
                .select("*")
                .single(); // Ensures only one row is returned
        }
        // Access the ID from the response
        if (response.error) {
            console.error(response.error);
        } else {
            console.log("success");
            let id = response.data.id
            navigate(`/view-set/${id}`)
        }
        // navigate(`/view-set/${id}`)
    };
    if(loading){
        return <Loading/>
    }

    return (
        <div className="p-3 w-100">
            <h2>{editing ? "Editing" : "Create"} Study Set</h2>
            <form className="create d-flex flex-column center p-5 gap-5" onSubmit={handleCreateStudySet}>
                <div className="d-flex flex-column w-100 gap-3">
                    <input
                        className="create-input create-title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="create-input create-description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="d-flex flex-column gap-3 w-100">
                    {terms.map((card, index) => {
                        return (
                            <StudyCardInput
                                key={index} // Use unique card id here
                                id={index}
                                term={card.term}
                                answer={card.answer}
                                handleDelete={handleStudyCardDelete}
                                handleUpdate={handleStudyCardUpdate}
                            />
                        );
                    })}
                </div>
                <button className = "create-button d-flex center"type="button" onClick={handleAddingStudyCard}>+</button>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    );
};

interface StudyCardProps {
    id: number;
    term: string;
    answer: string;
    handleDelete: (id: number) => void;
    handleUpdate: (id: number, updatedTerm: string, updatedAnswer: string) => void;
}

export const StudyCardInput: React.FC<StudyCardProps> = ({
    id,
    term,
    answer,
    handleDelete,
    handleUpdate
}) => {
    return (
        <div className="create-card" key={id}>
            <div>{id + 1}</div>
            <div className="d-flex justify-content-evenly create-card-input">
                <input
                    placeholder="Term"
                    value={term}
                    onChange={(e) => handleUpdate(id, e.target.value, answer)}
                />
                <input
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => handleUpdate(id, term, e.target.value)}
                />
            </div>
            <button className = "create-button d-flex center"type="button" onClick={() => handleDelete(id)}>X</button>
        </div>
    );
};
