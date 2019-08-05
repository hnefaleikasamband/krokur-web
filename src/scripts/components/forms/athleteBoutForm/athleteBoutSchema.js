import * as Yup from "yup";

const UUIDv4 = Yup.string().matches(
  /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[1-4][a-fA-F0-9]{3}-[89aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/
);
const SHORTHAND = Yup.string()
  .min(2)
  .max(5)
  .uppercase();

export default Yup.object().shape({
  athleteId: UUIDv4.required(),
  athleteName: Yup.string().required(),
  athleteClubShortHand: SHORTHAND.required(),
  opponentId: UUIDv4.required(),
  opponentName: Yup.string().required(),
  opponentClubShortHand: SHORTHAND.required(),
  class: Yup.string()
    .uppercase()
    .matches(/A|B|C{1}/)
    .required(),
  boutDate: Yup.date().required(),
  points: Yup.number()
    .min(9)
    .max(45)
    .required(),
  organizer: SHORTHAND.required()
});
