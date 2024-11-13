import { Link } from 'react-router-dom';
import { FaBell, FaSearch, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useSessionContext } from '../../SessionContext';
import { supabase } from '../../supabaseClient';

const TopNav = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const session = useSessionContext();
    const handleSearchChange = (event : any) => {
        setSearchTerm(event.target.value);
    };
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            return;
        }
        window.location.reload()
    };
    const handleSearchSubmit = (event : any) => {
        event.preventDefault();
        // Perform search action with `searchTerm`, like API call or filter function
        console.log("Searching for:", searchTerm);
    };
    const handleLogoClick = () => {
        setSearchTerm(""); // Reset search term when the logo is clicked
    };
    return (
        <div className="top-nav">
            <div className="top-nav-logo" onClick={handleLogoClick}>
                <Link to ="/"> Quizhub</Link>
            </div>
            <form className="top-nav-search" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">
                    <FaSearch />
                </button>
            </form>
            <div className="top-nav-links">
                <Link to="/notifications">
                    <FaBell />
                </Link>
                <li>
                    {session.user ?
                        <Link to="/" onClick={() => signOut()}>
                            <FaSignOutAlt /> 
                        </Link>
                        :
                        <Link to="/login">
                            <FaSignInAlt />
                        </Link>
                    }
                </li>
            </div>
        </div>
    );
};

export default TopNav;
