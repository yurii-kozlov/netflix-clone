import { RegistrationFormInputs } from 'types/formInputs/RegistrationFormInputs';

export interface SignInFormInputs extends RegistrationFormInputs {
  rememberMe: boolean
}
