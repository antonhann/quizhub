import { AppContainer } from "../helper"
import { useNavigate } from "react-router";

export const Home = () => {
    const navigate = useNavigate();
    return(
        <AppContainer>
            <section className="d-flex justify-content-center align-items-center text-gray text-center py-5 flex-grow-1">
                <div className="container">
                    <h3 className="display-4">Welcome to Quizhub</h3>
                    <p className="lead">Here is where we are able to study flashcard sets!</p>
                    <div className="home-buttons d-flex justify-content-around pt-5">
                    <button onClick={() => navigate('/create')}>Create</button>
                    <button onClick={() => navigate('/view_mysets')}>View My Study Sets</button>
                    <button onClick={() => navigate('/search')}>Search</button>
                    </div>
                </div>
            </section>
        </AppContainer>
    )
}