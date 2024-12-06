import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { PushNotifications } from '@capacitor/push-notifications';
import { SplashScreen } from '@capacitor/splash-screen';

export const useNativeFeatures = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      return position.coords;
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      return image.webPath;
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  };

  const setupPushNotifications = async () => {
    try {
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive === 'granted') {
        await PushNotifications.register();
      }
    } catch (error) {
      console.error('Error setting up push notifications:', error);
    }
  };

  useEffect(() => {
    // Hide splash screen when app is ready
    SplashScreen.hide();
    
    // Setup push notifications
    setupPushNotifications();
  }, []);

  return {
    location,
    getCurrentLocation,
    takePicture
  };
};