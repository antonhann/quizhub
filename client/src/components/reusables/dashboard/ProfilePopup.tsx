import { Link } from 'react-router-dom';
import { useSessionContext } from '../../../SessionContext';
import { supabase } from '../../../supabaseClient';
import { FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useRef, useState } from 'react';
const ProfilePopup = () => {
    const session = useSessionContext();
    const formRef = useRef<HTMLDivElement  | null>(null);
    
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            return;
        }
        window.location.reload()
    };
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const togglePopup = () => {
        setShowPopup((prev : boolean) => !prev);
    };
    const linkClass = "d-flex gap-3 center"
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Profile Icon */}
        <FaUserCircle 
            onClick={togglePopup}
            size={40} 
            style={{ cursor: 'pointer'}} 
        />
        {/* Popup Menu */}
        {showPopup && (
            <div ref = {formRef} className='profilePopup'>
                <h3>{session.username}</h3>
                {session.user ?
                    <Link className = {linkClass} to="/" onClick={() => signOut()}>
                        <FaSignOutAlt /> Logout
                    </Link>
                    :
                    <Link className = {linkClass} to="/login">
                        <FaSignInAlt /> Login
                    </Link>
                }
            </div>
        )}
    </div>
  )
}
export default ProfilePopup
