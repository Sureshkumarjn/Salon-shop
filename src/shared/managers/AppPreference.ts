import { v4 as uuidv4 } from 'uuid';

enum PreferenceKeys {
    DEVICE_TOKEN = 'DEVICE_TOKEN',
    FCM_TOKEN = 'FCM_TOKEN',
}

class AppPreference {
    setInStorage(key: PreferenceKeys, value: any): void {
        localStorage.setItem(key.toString(), value);
    }

    getFromStorage(key: PreferenceKeys): any {
        return localStorage.getItem(key.toString());
    }

    deleteFromPreference(key: PreferenceKeys): void {
        localStorage.removeItem(key.toString());
    }

    setObject(key: PreferenceKeys, object: any): void {
        const objectStr = JSON.stringify(object);
        this.setInStorage(key, objectStr);
    }

    getObject(key: PreferenceKeys): any {
        const objectStr = this.getFromStorage(key);
        if (objectStr) {
            return JSON.parse(objectStr);
        }
        return null;
    }

    clearStorage(): void {
        localStorage.clear();
    }

    setDeviceToken(deviceToken: string): void {
        this.setInStorage(PreferenceKeys.DEVICE_TOKEN, deviceToken);
    }

    getDeviceToken(): string {
        const token = this.getFromStorage(PreferenceKeys.DEVICE_TOKEN);
        if (token) {
            return token;
        }
        const newtoken = uuidv4();
        this.setDeviceToken(newtoken);
        return newtoken;
    }

    setFCMToken(fcmToken: string): void {
        this.setInStorage(PreferenceKeys.FCM_TOKEN, fcmToken);
    }

    getFCMToken(): string {
        const token = this.getFromStorage(PreferenceKeys.FCM_TOKEN);
        if (token) {
            return token;
        }
        return '';
    }
}

export default new AppPreference();
