import { Plan } from 'types/Plan';

export interface User {
  email: string;
  isActivated: boolean;
  id: string;
  plan: Plan;
}
