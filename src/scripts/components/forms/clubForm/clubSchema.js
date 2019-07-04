import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  shorthand: Yup.string()
    .min(2)
    .max(5)
    .required(),
});
