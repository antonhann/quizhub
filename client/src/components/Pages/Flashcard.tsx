import { useLocation, useNavigate, useParams } from 'react-router';
import { useSessionContext } from '../../SessionContext';
import React, { useEffect, useRef, useState } from 'react';
import { StudyCard } from '../../models/StudyCard';
import { ToggleButton } from '../reusables/tools/ToggleButton';
import { supabase } from '../../supabaseClient';
import { fetchFlashcardData } from '../../fetchHelper';
import Loading from '../reusables/tools/Loading';
import Popup from '../reusables/dashboard/Popup';

export const Flashcard = () => {
    const params = useParams();
    const session = useSessionContext();
    const location = useLocation();
    const navigate = useNavigate();
    const studySetID = params.id;

    const [terms, setTerms] = useState<StudyCard[]>(location.state.originalStudySet.terms)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [showingTerm, setShowingTerm] = useState<boolean>(true)
    const [shuffled, setShuffled] = useState<boolean>(false)
    const [smartSort, setSmartSort] = useState<boolean>(false)
    const [knowTerms, setKnowTerms] = useState<number>(0)
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [startsWithTerm, setStartsWithTerm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [dataLoaded, setDataLoaded] = useState<boolean>(false)


    const handleNextCard = (inc: number) => {
        if (currentIndex + inc < 0){
            return;   
        }
        setCurrentIndex((prevIndex) => prevIndex + inc)
        setShowingTerm(startsWithTerm)
    };
    
    const handleRestartClick = () => {
        setCurrentIndex(0)
        setKnowTerms(0)
        let ogTerms = location.state.originalStudySet.terms
        ogTerms.forEach((item : StudyCard) => {
            item.knows = false; // Mutate each item directly
        });
        setTerms(location.state.originalStudySet.terms)
        if (shuffled){
            let shuffledTerms = shuffle(location.state.originalStudySet.terms)
            setTerms(shuffledTerms)
        }
    }
    const toggleStartWithTerm = () => {
        setStartsWithTerm(!startsWithTerm)
        setShowingTerm(!showingTerm)
    }
    const toggleShuffle = () => {
        let newShuffled = !shuffled
        setShuffled(newShuffled)
        if (newShuffled){
            const doneStudySet = terms.slice(0,currentIndex)
            const remainingStudySet = terms.slice(currentIndex)
            shuffle(remainingStudySet)
            setTerms(doneStudySet.concat(remainingStudySet))
        }else{
            const doneSet = terms.slice(0,currentIndex)
            //sorts the remaining terms by id in ascending order
            const remainingSet = terms.slice(currentIndex).sort((a,b) => a.id - b.id)
            setTerms(doneSet.concat(remainingSet))
        }
    }
    const handleIDKCard = () => {
        terms[currentIndex].knows = false
        setKnowTerms(knowTerms - 1)
        handleNextCard(1)
    }
    const handleKnowsCard = () => {
        terms[currentIndex].knows = true
        setKnowTerms(knowTerms + 1)
        handleNextCard(1)
    }
    const handleReviewUnknownTermsClick = () => {
        setKnowTerms(0)
        const unknownSet = terms.filter((item) => {
            return item.knows === false
        })
        if(unknownSet.length === 0){
            
        }else{
            setTerms(unknownSet)
            setCurrentIndex(0)
        }
    }
    useEffect(() => {
        const updatedData = {
            terms: terms,
            username: session.username,
            currentIndex: currentIndex,
            showingTerm: showingTerm,
            smartSort: smartSort,
            studySetID: studySetID,
            shuffled: shuffled,
            knowTerms: knowTerms,
            startsWithTerm: startsWithTerm
        }
        const updateFlashcardDB = async () => {
            const {data} = await fetchFlashcardData(session.username, studySetID)
            let operation;
            if(!data){
                operation = await supabase.from("Flashcard")
                .insert(updatedData)
                .select("*")
                .single()
            }else{
                operation = await supabase.from("Flashcard")
                .update(updatedData)
                .eq("studySetID", studySetID)
                .eq("username", session.username)
                .select("*")
                .single()
            }
            if (operation.error){
                console.error(operation.error)
                return
            }
        }
        if(dataLoaded){
            updateFlashcardDB()
        }
       
        
    },[currentIndex,showingTerm,smartSort,shuffled,startsWithTerm])

    useEffect(() => {
        if(!session.user){
            navigate("/login");
            return
        }
        const updateState = async () => {
            setLoading(true)
            const {data, error} = await fetchFlashcardData(session.username, studySetID)
            if(!data){
                setLoading(false)
                setDataLoaded(true)
                return
            }
            if(error){
                console.error(error)
                return
            }
            else{
                setTerms(data.terms)
                setCurrentIndex(data.currentIndex)
                setShowingTerm(data.showingTerm)
                setShuffled(data.shuffled)
                setSmartSort(data.smartSort)
                setKnowTerms(data.knowTerms)
                setStartsWithTerm(data.startsWithTerm)
            }
            setLoading(false)
            setDataLoaded(true)
        }
        updateState();
    },[])
    // useEffect(() => {
    //     console.log(showing)
    // },[showing])

    if(loading){
        return <Loading/>
    }

    if(currentIndex == terms.length){
        return(
            <FinishFlashcards
                knowTerms={knowTerms}
                smartSort = {smartSort}
                handleRestartClick={handleRestartClick}
                handleReviewUnknownTermsClick={handleReviewUnknownTermsClick}
                length={terms.length}
            >
            </FinishFlashcards>
        )
    }
    return (
        <div className='d-flex yes-center flashcard-container flex-column gap-3'>
            <div className='d-flex justify-content-between'>
                <p>{currentIndex + 1} / {terms.length}</p>
                <button className = "" onClick={() => navigate("/view-set/" + studySetID)}>X</button>
            </div>
            <div
                className={`flashcard ${showingTerm ? 'showingTerm' : 'showingAnswer'}`}
                onClick={() => setShowingTerm(!showingTerm)}
            >
                <div className="flashcard-content term">
                    {terms[currentIndex].term}
                </div>
                <div className="flashcard-content answer">
                    {terms[currentIndex].answer}
                </div>
            </div>
            <div>
                {
                    smartSort ?
                    <div className='d-flex gap-3'>

                        <button onClick={() => handleIDKCard()}>IDK</button>
                        <button onClick={() => handleKnowsCard()}>Know</button>
                    </div>
                    :
                    <div className='d-flex gap-3'>
                        <button onClick={() => handleNextCard(-1)}>Prev</button>
                        <button onClick={() => handleNextCard(1)}>Next</button>
                    </div>
                }
            </div>
            <div>
                <button className = "" onClick={() => setShowPopup(!showPopup)}>Options</button>
            </div>
            <Popup
                title = "Options"
                className="flashcardOptionsPopup"
                showPopup = {showPopup}
                setShowPopup={setShowPopup}
            >
                <div className='toggleButtons'>
                    <ToggleButton
                        toggleFunction = {() => toggleShuffle()}
                        label = "Shuffle"
                        check = {shuffled}
                    />
                    <ToggleButton
                        toggleFunction = {() => setSmartSort(!smartSort)}
                        label = "Smart Sort"
                        check = {smartSort}
                    />
                    <ToggleButton
                        toggleFunction = {() => toggleStartWithTerm()}
                        label = "Start with Term"
                        check = {startsWithTerm}
                    />
                </div>
            </Popup>
        </div>
    )
}
interface FinishFlashcardsProps{
    smartSort: boolean,
    knowTerms: number,
    length: number,
    handleReviewUnknownTermsClick: () => void,
    handleRestartClick : () => void
}
const FinishFlashcards : React.FC<FinishFlashcardsProps>= (props) => {
    const{
        smartSort,
        knowTerms,
        length,
        handleReviewUnknownTermsClick,
        handleRestartClick,
    } = props;

    return( 
        <div className='d-flex flex-column center h-100'>
            <div>
                {smartSort &&
                ((knowTerms !== length) ?
                <button onClick={() => handleReviewUnknownTermsClick()}>Review Unknown Terms</button>
                :
                <div>Finished!</div>
                )
                }
                {
                    !smartSort && <div>Congrats on finishing!</div>
                }
            </div>
            <div>
                <button onClick={() => handleRestartClick()}>Restart</button>
            </div>
        </div>
    )   
}
function shuffle(array : StudyCard[]) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
export default Flashcard
