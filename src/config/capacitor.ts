import { Capacitor } from '@capacitor/core';

export const isNativePlatform = Capacitor.isNativePlatform();
export const getPlatform = () => Capacitor.getPlatform();

export const config = {
  ios: {
    statusBarStyle: 'dark',
    backgroundColor: '#0B0B1F',
    splashScreenDelay: 2000,
  },
  permissions: {
    location: {
      ios: ['locationWhenInUse']
    },
    notifications: {
      ios: ['alert', 'badge', 'sound']
    }
  }
};