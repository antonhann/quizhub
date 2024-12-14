import { Link, useNavigate } from 'react-router-dom';
import { FaSearch  } from 'react-icons/fa';
import { useState } from 'react';
import ProfilePopup from './ProfilePopup';

const TopNav = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    
    const handleSearchChange = (event : any) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchSubmit = async (event : any) => {
        event.preventDefault();
        console.log(searchTerm)
        if (searchTerm.length <= 3){
            return
        }
        navigate(`/search/` + searchTerm, { replace: true })
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
            <ProfilePopup/>
        </div>
    );
};

export default TopNav;
