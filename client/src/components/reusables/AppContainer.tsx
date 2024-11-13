import DisplayBar from "./DisplayBar"
import TopNav from "./TopNav"
export const AppContainer = ({ children} : any) => {
    return (
        <div className = "app-container">
            <TopNav/>
            <DisplayBar/>
            <section className="main-container">
                {children}
            </section>
        </div>
    )
}