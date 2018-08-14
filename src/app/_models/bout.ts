import Athlete from "./athlete";

export default  interface Bout {
    _id?: String,
    athlete: {
        _id: String,
        name: String,
        club: String,
    },
    opponent?: {
        _id: String,
        name: String,
        club: String,
    },
    type: CharacterData,
    date: Date,
    points: Number,
    eventOrganizer: String
}