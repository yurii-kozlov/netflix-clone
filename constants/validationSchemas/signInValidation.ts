import * as yup from 'yup'

export const signInValidation = yup.object().shape({
  email: yup.string()
    .required('Email is required!')
    .email('Please enter a valid email address'),
  password: yup.string()
    .required('Password is required!')
    .min(4, 'Password must contain between 4 and 60 characters')
    .max(60, 'Password should be between 4 and 60 characters'),
  rememberMe: yup.boolean()
});
