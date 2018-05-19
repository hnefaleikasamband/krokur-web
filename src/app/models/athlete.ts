import Bout from "./bout";

export default Athlete;

export interface Athlete {
    _id?: string,
    name: string,
    ssn: string,
    club?: string,
    achievements?: {
        diploma?: Date,
        bronz?: Date,
        silver?: Date,
        gold?: Date
    }
}

export  interface AthleteTab {
    _id?: string,
    name: string,
    ssn: string,
    club?: string,
    achievements?: {
        diploma?: Date,
        bronz?: Date,
        silver?: Date,
        gold?: Date
    },
    bouts: Bout[]
}

export class AthleteForm {
    constructor(
        public _id?: string,
        public name?: string,
        public ssn?: string,
        public club?: string
    ) {}
    
}