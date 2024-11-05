export class StudyCard{
    term : string
    answer : string
    id: number
    knows: boolean
    constructor(id = 0, term : string = "", answer : string = "", knows = false){
        this.term = term
        this.answer = answer
        this.id = id
        this.knows = knows
    }
};

export const serializeStudyCards = ( cards : StudyCard[]) => {
    let serialize = []

    for(let i = 0; i < cards.length; i++){
        if (cards[i].term || cards[i].answer){
            serialize.push({
                id: cards[i].id,
                term: cards[i].term,
                answer: cards[i].answer,
                knows: cards[i].knows
            })
        }
    }
    return serialize
}