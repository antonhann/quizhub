interface NavProps{
    active?: Sections
}

export enum Sections{
    Home,
    Create,
    View,
    Search
}
export const NavBar = (props: NavProps) => {

    const {
        active
    } = props;

    return(
        <>
            <nav className="navbar navbar-expand-lg p-3">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex gap-3" href="/">
                        <img src="/vite.svg"></img>
                        <h2>AlgVis</h2>
                    </a>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className={`nav-link ${active == Sections.Create ? "active" : ""}`} aria-current="page" href="/create">Create</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${active == Sections.View ? "active" : ""}`} aria-current="page" href="/view-my">View</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${active == Sections.Search ? "active" : ""}`} aria-current="page" href="/search">Search</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export const Footer = () => {
    return(
        <>
            <footer className="footer d-flex justify-content-center align-items-center">
                <p>&copy; 2024 QuizHub. All Rights Reserved.</p>
            </footer>
        </>
    )
}

export const AppContainer = ({ children, active} : any) => {
    return (
        <div className = "app-container">
            <NavBar active= {active} />
            <section className="main-container">
                {children}
            </section>
            <Footer/>
        </div>
    )
}