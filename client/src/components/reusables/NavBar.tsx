import { useNavigate } from "react-router";
import { useSessionContext } from "../../SessionContext";
import { supabase } from "../../supabaseClient";

export enum Sections{
    Home,
    Create,
    View,
    Search
}
interface NavProps{
    active?: Sections
}
export const NavBar = (props: NavProps) => {
    const { active } = props;
    const session = useSessionContext();
    const navigate = useNavigate();
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            return;
        }
        navigate("/");
    };
    return (
        <nav className="navbar navbar-expand-lg p-3">
            <div className="container-fluid">
                <a className="navbar-brand d-flex gap-3" href="/">
                    <img src="/vite.svg" alt="Logo" />
                    <h2>AlgVis</h2>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className={`nav-link ${active === Sections.Create ? "active" : ""}`} onClick={() => navigate("/register")}>Create</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${active === Sections.View ? "active" : ""}`} onClick={() => navigate("/register")}>View</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${active === Sections.Search ? "active" : ""}`} onClick={() => navigate("/register")}>Search</a>
                        </li>
                        {session.user?
                            <li className="nav-item">
                                <a className="nav-link" style = {{cursor: "pointer"}}onClick={() => signOut()}>Logout</a>
                            </li>
                            :
                            <li className="nav-item">
                                <a className="nav-link" style = {{cursor: "pointer"}} onClick={() => navigate("/login")}>Log In</a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};