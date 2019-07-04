import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(5, 'Password has to be longer than 6 characters!')
    .required('Password is required!')
    .strict(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords are not the same!')
    .required('Password confirmation is required!')
    .strict(),
  role: Yup.string().required(),
  club: Yup.string().when(('role', { is: 'COACH', then: Yup.string().required() })),
  disabled: Yup.bool().default(false),
});
