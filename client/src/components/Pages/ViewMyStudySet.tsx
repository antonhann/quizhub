import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext"
import { AppContainer } from "../reusables/AppContainer"
import { useEffect } from "react";

export const ViewMyStudySet = () => {
    const session = useSessionContext();
    const navigate = useNavigate();
    useEffect(() => {
        if(!session.user){
            navigate("/login");
        }
    },[])
    return (
        <AppContainer>
            <h1>View My Study Set</h1>
        </AppContainer>
    )
}