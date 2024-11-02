export class StudyCard{
    term : string
    answer : string
    constructor(term : string = "", answer : string = ""){
        this.term = term
        this.answer = answer
    }
};

const serializeStudyCard = ( cards : StudyCard[]) => {
    return (cards.map(item => ({
        term: item.term,
        answer: item.answer,
    })));
}