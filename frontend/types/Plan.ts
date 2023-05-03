export enum SubscriptionPlans {
  Basic = 'basic',
  Standard = 'standard',
  Premium = 'premium'
}

export interface Plan {
  name: string;
  monthlyPrice: number;
  videoQuality: string;
  resolution: string;
  multideviceViewing: boolean;
}

export type Plans = {
  basic: Plan;
  standard: Plan;
  premium: Plan;
}
