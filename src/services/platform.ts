import { Capacitor } from '@capacitor/core';
import { config } from '../config/capacitor';

let StatusBar: any;
let SplashScreen: any;

export const initializePlatform = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      // Dynamic imports to prevent build errors
      const statusBarModule = await import('@capacitor/status-bar');
      const splashScreenModule = await import('@capacitor/splash-screen');
      
      StatusBar = statusBarModule.StatusBar;
      SplashScreen = splashScreenModule.SplashScreen;

      await StatusBar.setStyle({ style: config.ios.statusBarStyle });
      await SplashScreen.hide({
        fadeOutDuration: 500
      });
    } catch (error) {
      console.error('Error initializing platform:', error);
    }
  }
};

export const getPlatformSpecificStyle = (style: any) => {
  if (Capacitor.getPlatform() === 'ios') {
    return {
      ...style,
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)'
    };
  }
  return style;
};