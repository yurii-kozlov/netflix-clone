import { creditCardValidation } from '@/constants/validationSchemas/creditCardValidation';
import { CreditCardFormInputs } from '@/types/CreditCardFormInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export const CustomInput = (props): ReactElement => {
  const {
  register
  } = useForm<CreditCardFormInputs>({
    mode: 'all',
    resolver: yupResolver(creditCardValidation)
  })

  return (
    <input
      {...props}
    // className={styles.input}
      id="card-number"
      type="tel"
      // {...register('cardNumber')}
    />

  )
  }
