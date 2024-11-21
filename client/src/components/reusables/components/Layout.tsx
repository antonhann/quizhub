import DisplayBar from "../dashboard/DisplayBar"
import TopNav from "../dashboard/TopNav"
export const Layout = ({ children} : any) => {
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