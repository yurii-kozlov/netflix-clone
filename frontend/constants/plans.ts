import { Plans } from 'types/Plan';

export const plans: Plans = {
  basic: {
    name: 'Basic',
    videoQuality: 'Good',
    monthlyPrice: 4.99,
    resolution: '720p',
    multideviceViewing: true
  },
  standard: {
    name: 'Standard',
    videoQuality: 'Better',
    monthlyPrice: 7.49,
    resolution: '1080p',
    multideviceViewing: true
  },
  premium: {
    name: 'Premium',
    videoQuality: 'Best',
    monthlyPrice: 9.99,
    resolution: '4K+HDR',
    multideviceViewing: true
  }
};
