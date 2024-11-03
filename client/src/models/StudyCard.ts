export class StudyCard{
    term : string
    answer : string
    id: number
    constructor(id = 0, term : string = "", answer : string = ""){
        this.term = term
        this.answer = answer
        this.id = id
    }
};

export const serializeStudyCards = ( cards : StudyCard[]) => {
    return (cards.map(item => ({
        term: item.term,
        answer: item.answer,
    })));
}