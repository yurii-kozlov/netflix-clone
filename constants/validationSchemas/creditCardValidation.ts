import * as yup from 'yup';

export const creditCardValidation = yup.object().shape({
  cardNumber: yup.string()
    .required('Please enter a card number.')
    .matches(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/, 'Invalid card number'),
  expirationDate: yup.string()
    .required('Please enter an expiration date.')
    .matches(/^(0[1-9]|1[0-2]) \/ ([0-9]{2})$/, 'Invalid expiration date')
    .test('expiration-date', 'Card is expired', (value) => {
      const [month, year] = value?.split(' / ')?? ['', ''];
      const expirationDate = new Date(Number(`20${year}`), Number(month) - 1, 1);
      const today = new Date();

      return expirationDate > today;
    }),
  CVVcode: yup.string()
    .required('Please enter a CVV code')
    .min(3, 'Please enter a valid CVV code.')
    .max(3, 'Please enter a valid CVV code.'),
  firstName: yup.string()
    .required('Please enter a first name')
    .matches(/^[A-Za-z]+$/, 'Please enter a valid first name'),
  lastName: yup.string()
    .required('Please enter a last name'),
  agree: yup.boolean()
    .oneOf([true], 'You must acknowledge that you have read and agree to the Terms of Use to continue.'),
});
