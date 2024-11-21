import { useEffect, useRef } from 'react'
interface PopupProps {
    title: string;
    children?: React.ReactNode; // To pass dynamic content
    className?: string;
    showPopup: boolean;
    setShowPopup: (bool : boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ title, children, className, showPopup, setShowPopup}) => {
    const formRef = useRef<HTMLDivElement  | null>(null);
    const handleClickOutsideForm = (event : any) => {
        /**if click is outside of the div close form */
        if (formRef && formRef.current && !formRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideForm);
        // Cleanup the event listener on component unmount
        return () => {
          document.removeEventListener("mousedown", handleClickOutsideForm);
        };
    }, [formRef]);
    if(!showPopup){return}
    return (
        <>
            <div className = {className}>
                <div ref = {formRef} className= "optionInner">
                    <div className='d-flex justify-content-between w-100'>
                        <h2>{title}</h2>
                        <button className = "closeButton" onClick={() => setShowPopup(!showPopup)}>X</button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Popup
