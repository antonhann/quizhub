import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { AppContainer } from "../reusables/AppContainer"
import { useEffect } from "react";

export const Create = () => {
    const session = useSessionContext();
    const navigate = useNavigate();
    useEffect(() => {
        if(!session.user){
            navigate("/login");
        }
    },[])
    return (
        <AppContainer>
            <h1>Create</h1>
        </AppContainer>
    )
}