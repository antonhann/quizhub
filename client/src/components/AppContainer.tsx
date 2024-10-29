import { Footer } from "./Footer"
import { NavBar } from "./NavBar"
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