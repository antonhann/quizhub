import { Link } from "react-router-dom"; // If you're using React Router for navigation
import { FaHome, FaBook, FaSearch, FaPlus, FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";
import { useSessionContext } from "../../SessionContext";

const DisplayBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const session = useSessionContext();
    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the visibility of the menu
    };
    return (
        <div className={`display-bar p-3 ${isOpen ? 'open' : 'closed'}`}>
            {/* Menu toggle button */}
            <div className="hamburger-icon" onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />} {/* Toggle between hamburger and close icon */}
            </div>

            {/* Navigation - only visible when the menu is open */}
            <nav className="nav">
                <ul className="d-flex flex-column gap-3">
                    <li>
                        <Link to="/">
                            <FaHome /> <span className= {`${isOpen && "open"}`}>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={session.user ? "/create" : "/login"}>
                            <FaPlus /> <span className= {`${isOpen && "open"}`}>Create</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={session.user ? "/my-library" : "/login"}>
                            <FaBook /> <span className= {`${isOpen && "open"}`}>My Library</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/search">
                            <FaSearch /> <span className= {`${isOpen && "open"}`}>Search</span>
                        </Link>
                    </li>
                    {/* Conditional logout/login */}
                </ul>
            </nav>
        </div>
    );
};

export default DisplayBar;
