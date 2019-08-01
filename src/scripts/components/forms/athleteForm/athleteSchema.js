import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  personalIdentificationNumber: Yup.string()
    .min(10)
    .max(10)
    .required(),
  club: Yup.string().required(),
});
