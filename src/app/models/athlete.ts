export default  interface Athlete {
    _id?: String,
    name: String,
    ssn: String,
    club?: String,
    achievements?: {
        diploma?: Date,
        bronz?: Date,
        silver?: Date,
        gold?: Date
    }
}