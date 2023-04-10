import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
  email: yup.string()
    .required('Email is required!')
    .email('Please enter a valid email address')
    .min(5, 'Email should be between 5 and 50 characters')
    .max(50, 'Email should be between 5 and 50 characters'),
  password: yup.string()
    .required('Password is required!')
    .min(5, 'Password should be between 6 and 60 characters')
    .max(50, 'Password should be between 6 and 60 characters'),
});
