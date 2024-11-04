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
    let serialize = []

    for(let i = 0; i < cards.length; i++){
        if (cards[i].term || cards[i].answer){
            serialize.push({
                term: cards[i].term,
                answer: cards[i].answer
            })
        }
    }
    return serialize
}