import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';

export const client = new KindeSDK(
  'https://userkinde.kinde.com',
  'exp://192.168.15.99:8081',  // local
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // simulate
  'exp://192.168.15.99:8081', // local
  'profile email offline openid'
);
