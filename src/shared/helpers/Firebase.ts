import { initializeApp } from 'firebase/app';
import {
    getMessaging,
    getToken,
    MessagePayload,
    onMessage,
} from 'firebase/messaging';
import AppPreference from 'shared/managers/AppPreference';
import EventEmitter, { SubscribeEvents } from './EventEmitter';

const firebaseConfig = {
    apiKey: 'AIzaSyBcE_SEqdtBTl61WdAcEHmQPnMzRqs3Pek',
    authDomain: 'dam-photo-app.firebaseapp.com',
    projectId: 'dam-photo-app',
    storageBucket: 'dam-photo-app.appspot.com',
    messagingSenderId: '1023011207770',
    appId: '1:1023011207770:web:b6a7a4d154aaeb1efa3663',
    measurementId: 'G-QJSBK4SN7D',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

onMessage(messaging, (payload: MessagePayload) => {
    EventEmitter.dispatch(SubscribeEvents.ON_NEW_NOTIFICATION, payload);
});

export const fetchFCMToken = (): Promise<void> =>
    getToken(messaging, {
        vapidKey:
            'BIpZLRXT26dBk538-bg8_w-5xyDFjuk6tvZUgoLUuM3ia9Yb4wn0C6G44HUpRzyIO3z6TVY2jskCGwvJSuE-axE',
    }).then((token: string) => {
        AppPreference.setFCMToken(token);
    });

export const requestFirebaseNotificationPermission = (): Promise<string> =>
    new Promise((resolve, reject) => {
        Notification.requestPermission()
            .then(() => fetchFCMToken())
            .catch((err) => {
                reject(err);
            });
    });
