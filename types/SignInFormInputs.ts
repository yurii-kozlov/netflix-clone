import { RegistrationFormInputs } from 'types/RegistrationFormInputs';

export interface SignInFormInputs extends RegistrationFormInputs {
  rememberMe: boolean
}
