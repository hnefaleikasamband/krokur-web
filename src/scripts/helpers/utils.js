import moment from "moment";

export const CalculateClassFromSSN = (ssn) => {
  if (ssn.length !== 10) return null;
  const century = ssn.slice(9, 10);
  const year = `${century === '0' ? 20 : 19}${ssn.slice(4, 6)}`;
  const today = moment(new Date());
  const calculationAge = today.diff(year, "years");

  const conditionals = (lower, upper) =>
    calculationAge >= lower && calculationAge <= upper;

  return calculationAge < 10
    ? "-"
    : conditionals(10, 11)
    ? "C"
    : conditionals(12, 13)
    ? "B"
    : "A";
};
